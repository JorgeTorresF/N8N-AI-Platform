import React, { useState } from 'react';
import { Download, FileText, Package, Archive, ExternalLink, CheckCircle, FolderOpen } from 'lucide-react';
import toast from 'react-hot-toast';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  filename: string;
  size: string;
  type: 'archive' | 'document' | 'workflow' | 'data';
  category: string;
  url: string;
}

const DownloadCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set());

  const downloadItems: DownloadItem[] = [
    {
      id: 'complete-archive',
      title: 'Complete Project Archive',
      description: 'Complete N8N AI Platform Replication project including all documentation, workflows, and implementation guides',
      filename: 'N8N_AI_Platform_Archive.zip',
      size: '2.5 MB',
      type: 'archive',
      category: 'Complete Package',
      url: '/data/N8N_AI_Platform_Archive.zip'
    },
    {
      id: 'main-guide',
      title: 'N8N AI Platform Replication Guide',
      description: 'Comprehensive main documentation covering the complete system overview, implementation, and usage',
      filename: 'N8N_AI_Platform_Replication_Guide.md',
      size: '26 KB',
      type: 'document',
      category: 'Documentation',
      url: '/data/N8N_AI_Platform_Replication_Guide.md'
    },
    {
      id: 'workflow-master',
      title: 'Master Orchestrator Workflow',
      description: 'Central coordination workflow that manages all sub-workflows and orchestrates complex AI operations',
      filename: 'master_orchestrator.json',
      size: '298 B',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/master_orchestrator.json'
    },
    {
      id: 'workflow-research',
      title: 'Research Engine Workflow',
      description: 'Automated research workflow with web search, content extraction, and information processing capabilities',
      filename: 'research_engine.json',
      size: '1.3 KB',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/research_engine.json'
    },
    {
      id: 'workflow-content',
      title: 'Content Generator Workflow',
      description: 'AI-powered content creation workflow supporting text, image, and multimedia generation',
      filename: 'content_generator.json',
      size: '2.0 KB',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/content_generator.json'
    },
    {
      id: 'workflow-code',
      title: 'Code Engine Workflow',
      description: 'Development automation workflow for code generation, testing, and deployment',
      filename: 'code_engine.json',
      size: '1.8 KB',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/code_engine.json'
    },
    {
      id: 'workflow-memory',
      title: 'Memory Manager Workflow',
      description: 'State management workflow for maintaining context and session data across executions',
      filename: 'memory_manager.json',
      size: '1.5 KB',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/memory_manager.json'
    },
    {
      id: 'workflow-error',
      title: 'Error Handler Workflow',
      description: 'Robust error handling workflow with logging, notification, and recovery mechanisms',
      filename: 'error_handler.json',
      size: '1.2 KB',
      type: 'workflow',
      category: 'N8N Workflows',
      url: '/data/workflows/error_handler.json'
    },
    {
      id: 'final-report',
      title: 'Final Report',
      description: 'Comprehensive project summary with findings, analysis, and conclusions',
      filename: 'final_report.md',
      size: '28 KB',
      type: 'document',
      category: 'Documentation',
      url: '/data/docs/final_report.md'
    },
    {
      id: 'implementation-roadmap',
      title: 'Implementation Roadmap',
      description: 'Phased implementation plan with priorities, timelines, and detailed setup instructions',
      filename: 'implementation_roadmap.md',
      size: '2.3 KB',
      type: 'document',
      category: 'Documentation',
      url: '/data/docs/implementation_roadmap.md'
    },
    {
      id: 'capability-mapping',
      title: 'Capability Mapping',
      description: 'Detailed mapping of AI platform capabilities to N8N workflow components',
      filename: 'capability_mapping.md',
      size: '8.2 KB',
      type: 'document',
      category: 'Documentation',
      url: '/data/docs/capability_mapping.md'
    },
    {
      id: 'workflow-architecture',
      title: 'Workflow Architecture',
      description: 'Detailed architecture overview and workflow design patterns for the N8N system',
      filename: 'workflow_architecture.md',
      size: '3.3 KB',
      type: 'document',
      category: 'Documentation',
      url: '/data/docs/workflow_architecture.md'
    }
  ];

  const categories = ['All', ...Array.from(new Set(downloadItems.map(item => item.category)))];

  const filteredItems = downloadItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleDownload = async (item: DownloadItem) => {
    try {
      const response = await fetch(item.url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = item.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadedItems(prev => new Set([...prev, item.id]));
      toast.success(`Downloaded ${item.title}`);
    } catch (error) {
      toast.error(`Failed to download ${item.title}`);
    }
  };

  const handleBulkDownload = () => {
    const completeArchive = downloadItems.find(item => item.id === 'complete-archive');
    if (completeArchive) {
      handleDownload(completeArchive);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'archive': return <Archive className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      case 'workflow': return <Package className="h-5 w-5" />;
      case 'data': return <FolderOpen className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'archive': return 'text-purple-600 dark:text-purple-400';
      case 'document': return 'text-blue-600 dark:text-blue-400';
      case 'workflow': return 'text-green-600 dark:text-green-400';
      case 'data': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCategoryStats = () => {
    const stats = downloadItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Download Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Access the complete N8N AI Platform Replication project archive and individual files. All downloads include comprehensive documentation and ready-to-use workflows.
        </p>

        {/* Quick Download */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Complete Project Package</h2>
              <p className="text-blue-100 mb-4">
                Download the entire N8N AI Platform Replication project including all workflows, documentation, and implementation guides.
              </p>
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <span>6 N8N Workflows</span>
                <span>•</span>
                <span>13 Documentation Files</span>
                <span>•</span>
                <span>Complete Implementation Guide</span>
              </div>
            </div>
            <button
              onClick={handleBulkDownload}
              className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download All (2.5 MB)
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-1 text-xs opacity-75">
                  ({categoryStats[category]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Download Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.size}
                  </span>
                  {downloadedItems.has(item.id) && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                  {item.category}
                </span>
                
                <button
                  onClick={() => handleDownload(item)}
                  className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Summary */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          What's Included
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              6 N8N Workflows
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Production-ready JSON workflow files for immediate import
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Complete Documentation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive guides, architecture diagrams, and implementation plans
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              API Integration Guides
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step-by-step integration instructions for external services
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Archive className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Platform Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detailed comparison and capability mapping of AI platforms
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> All workflow files are ready for immediate import into your N8N instance. 
            Refer to the implementation guide for detailed setup instructions and API configuration requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadCenter;