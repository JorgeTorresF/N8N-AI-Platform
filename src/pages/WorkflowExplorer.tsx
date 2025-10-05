import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Code, Workflow, Play, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

interface WorkflowData {
  name: string;
  nodes: any[];
  connections: any;
  active: boolean;
  settings: any;
  id: string;
}

interface WorkflowFile {
  filename: string;
  title: string;
  description: string;
  data: WorkflowData | null;
  category: string;
  icon: React.ReactNode;
}

const WorkflowExplorer: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowFile[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowFile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [jsonView, setJsonView] = useState(false);

  const workflowConfigs = [
    {
      filename: 'master_orchestrator.json',
      title: 'Master Orchestrator',
      description: 'Central coordination workflow that manages and orchestrates all sub-workflows. Acts as the main entry point for complex AI operations.',
      category: 'Core',
      icon: <Settings className="h-6 w-6" />
    },
    {
      filename: 'research_engine.json',
      title: 'Research Engine',
      description: 'Automated research workflow with web search capabilities, content extraction, and information processing for comprehensive data gathering.',
      category: 'Research',
      icon: <Search className="h-6 w-6" />
    },
    {
      filename: 'content_generator.json',
      title: 'Content Generator',
      description: 'AI-powered content creation workflow supporting text, image, and multimedia generation with customizable prompts and formatting.',
      category: 'Generation',
      icon: <Code className="h-6 w-6" />
    },
    {
      filename: 'code_engine.json',
      title: 'Code Engine',
      description: 'Development automation workflow for code generation, testing, deployment, and version control integration.',
      category: 'Development',
      icon: <Workflow className="h-6 w-6" />
    },
    {
      filename: 'memory_manager.json',
      title: 'Memory Manager',
      description: 'State management and persistence workflow for maintaining context, session data, and long-term memory across workflow executions.',
      category: 'Storage',
      icon: <Eye className="h-6 w-6" />
    },
    {
      filename: 'error_handler.json',
      title: 'Error Handler',
      description: 'Robust error handling and recovery workflow with logging, notification, and automatic retry mechanisms.',
      category: 'Utilities',
      icon: <Play className="h-6 w-6" />
    }
  ];

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const workflowPromises = workflowConfigs.map(async (config) => {
        try {
          const response = await fetch(`/data/workflows/${config.filename}`);
          if (response.ok) {
            const data = await response.json();
            return {
              ...config,
              data
            };
          } else {
            return {
              ...config,
              data: null
            };
          }
        } catch (error) {
          console.error(`Error loading ${config.filename}:`, error);
          return {
            ...config,
            data: null
          };
        }
      });

      const loadedWorkflows = await Promise.all(workflowPromises);
      setWorkflows(loadedWorkflows);
      setLoading(false);
    } catch (error) {
      console.error('Error loading workflows:', error);
      toast.error('Failed to load workflow files');
      setLoading(false);
    }
  };

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadWorkflow = (workflow: WorkflowFile) => {
    if (!workflow.data) {
      toast.error('Workflow data not available');
      return;
    }

    const dataStr = JSON.stringify(workflow.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = workflow.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${workflow.title}`);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Core': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      'Research': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      'Generation': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      'Development': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
      'Storage': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      'Utilities': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[category as keyof typeof colors] || colors.Utilities;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading workflows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Workflow Explorer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Interactive display of all 6 production-ready N8N workflows with detailed previews and download capabilities.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Workflow List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Available Workflows ({filteredWorkflows.length})
          </h2>
          {filteredWorkflows.map((workflow, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedWorkflow?.filename === workflow.filename
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600 dark:text-blue-400">
                    {workflow.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {workflow.title}
                  </h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(workflow.category)}`}>
                  {workflow.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {workflow.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {workflow.data ? `${workflow.data.nodes?.length || 0} nodes` : 'No data'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadWorkflow(workflow);
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Detail */}
        <div className="lg:col-span-2">
          {selectedWorkflow ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600 dark:text-blue-400">
                      {selectedWorkflow.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedWorkflow.title}
                    </h2>
                    <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(selectedWorkflow.category)}`}>
                      {selectedWorkflow.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setJsonView(!jsonView)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        jsonView
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <Code className="h-4 w-4 mr-1 inline" />
                      JSON View
                    </button>
                    <button
                      onClick={() => downloadWorkflow(selectedWorkflow)}
                      className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1 inline" />
                      Download
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedWorkflow.description}
                </p>
              </div>

              <div className="p-6">
                {selectedWorkflow.data ? (
                  <div>
                    {!jsonView ? (
                      /* Workflow Summary */
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              Workflow Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                  {selectedWorkflow.data.name || 'N/A'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Nodes:</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                  {selectedWorkflow.data.nodes?.length || 0}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Active:</span>
                                <span className={`font-medium ${
                                  selectedWorkflow.data.active
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}>
                                  {selectedWorkflow.data.active ? 'Yes' : 'No'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">ID:</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                  {selectedWorkflow.data.id || 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              Node Summary
                            </h3>
                            <div className="space-y-2">
                              {selectedWorkflow.data.nodes?.map((node, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {node.name || `Node ${index + 1}`}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    ({node.type || 'unknown'})
                                  </span>
                                </div>
                              )) || <p className="text-gray-500 dark:text-gray-400 text-sm">No nodes available</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* JSON View */
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Workflow JSON
                        </h3>
                        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                          <code className="text-gray-800 dark:text-gray-200">
                            {JSON.stringify(selectedWorkflow.data, null, 2)}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      Workflow data not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a Workflow
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a workflow from the list to view its details, nodes, and JSON structure.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowExplorer;