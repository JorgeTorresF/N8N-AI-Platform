import React, { useState, useEffect } from 'react';
import { Search, FileText, BookOpen, ChevronRight, ExternalLink, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface DocumentationItem {
  id: string;
  title: string;
  filename: string;
  description: string;
  category: string;
  content: string;
  size?: string;
}

const DocumentationHub: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentationItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentationItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const documentConfigs = [
    {
      id: 'main-guide',
      title: 'N8N AI Platform Replication Guide',
      filename: 'N8N_AI_Platform_Replication_Guide.md',
      description: 'Comprehensive main guide covering the complete N8N AI platform replication system',
      category: 'Main Guide'
    },
    {
      id: 'final-report',
      title: 'Final Report',
      filename: 'final_report.md',
      description: 'Complete project summary with findings, analysis, and conclusions',
      category: 'Reports'
    },
    {
      id: 'workflow-architecture',
      title: 'Workflow Architecture',
      filename: 'workflow_architecture.md',
      description: 'Detailed architecture overview and workflow design patterns',
      category: 'Architecture'
    },
    {
      id: 'master-workflow',
      title: 'Master Workflow Architecture',
      filename: 'master_workflow_architecture.md',
      description: 'Architecture specification for the master orchestrator workflow',
      category: 'Architecture'
    },
    {
      id: 'implementation-roadmap',
      title: 'Implementation Roadmap',
      filename: 'implementation_roadmap.md',
      description: 'Phased implementation plan with priorities and timelines',
      category: 'Implementation'
    },
    {
      id: 'capability-mapping',
      title: 'Capability Mapping',
      filename: 'capability_mapping.md',
      description: 'Mapping of AI platform capabilities to N8N workflow components',
      category: 'Analysis'
    },
    {
      id: 'feature-mapping',
      title: 'Feature Mapping',
      filename: 'feature_mapping.md',
      description: 'Detailed feature comparison and implementation mapping',
      category: 'Analysis'
    },
    {
      id: 'feasibility-assessment',
      title: 'Feasibility Assessment',
      filename: 'feasibility_assessment.md',
      description: 'Technical feasibility analysis for AI platform replication',
      category: 'Assessment'
    },
    {
      id: 'limitations-workarounds',
      title: 'Limitations and Workarounds',
      filename: 'limitations_and_workarounds.md',
      description: 'Known limitations and recommended workaround strategies',
      category: 'Technical'
    },
    {
      id: 'external-services',
      title: 'External Services',
      filename: 'external_services.md',
      description: 'Required external APIs, services, and integration requirements',
      category: 'Technical'
    },
    {
      id: 'n8n-capabilities',
      title: 'N8N Capabilities Analysis',
      filename: 'n8n_capabilities_analysis.md',
      description: 'Comprehensive analysis of N8N platform capabilities and features',
      category: 'Analysis'
    },
    {
      id: 'ai-platform-features',
      title: 'AI Platform Features Summary',
      filename: 'ai_platform_features_summary.md',
      description: 'Summary of analyzed AI platform features and capabilities',
      category: 'Analysis'
    },
    {
      id: 'minimax-content',
      title: 'MiniMax Space Content',
      filename: 'minimax_space_content.md',
      description: 'Extracted content and analysis from MiniMax space webpage',
      category: 'Research'
    }
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docPromises = documentConfigs.map(async (config) => {
        try {
          const response = await fetch(`/data/${config.filename === 'minimax_space_content.md' ? '' : 'docs/'}${config.filename}`);
          if (response.ok) {
            const content = await response.text();
            const size = `${Math.round(content.length / 1024)}KB`;
            return {
              ...config,
              content,
              size
            };
          } else {
            return {
              ...config,
              content: 'Content not available',
              size: '0KB'
            };
          }
        } catch (error) {
          console.error(`Error loading ${config.filename}:`, error);
          return {
            ...config,
            content: 'Error loading content',
            size: '0KB'
          };
        }
      });

      const loadedDocs = await Promise.all(docPromises);
      setDocuments(loadedDocs);
      
      // Select the main guide by default
      const mainGuide = loadedDocs.find(doc => doc.id === 'main-guide');
      if (mainGuide) {
        setSelectedDoc(mainGuide);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error('Failed to load documentation');
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(documents.map(doc => doc.category)))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadDocument = (doc: DocumentationItem) => {
    const element = document.createElement('a');
    const file = new Blob([doc.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = doc.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Downloaded ${doc.title}`);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Main Guide': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      'Reports': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      'Architecture': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      'Implementation': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
      'Analysis': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      'Assessment': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      'Technical': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      'Research': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading documentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Documentation Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive documentation for the N8N AI Platform Replication project with search and navigation.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Documents ({filteredDocuments.length})
          </h2>
          
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedDoc?.id === doc.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                    {doc.title}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {doc.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {selectedDoc ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedDoc.title}
                    </h2>
                    <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(selectedDoc.category)}`}>
                      {selectedDoc.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadDocument(selectedDoc)}
                      className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedDoc.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Size: {selectedDoc.size}</span>
                  <span>Filename: {selectedDoc.filename}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 overflow-auto max-h-96">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {selectedDoc.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a Document
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a document from the sidebar to view its content and details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationHub;