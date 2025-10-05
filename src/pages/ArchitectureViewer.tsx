import React, { useState, useEffect } from 'react';
import { Building, Layers, GitBranch, Workflow, Database, Globe, Settings, ArrowRight } from 'lucide-react';

const ArchitectureViewer: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');

  const architectureViews = [
    {
      id: 'overview',
      title: 'System Overview',
      icon: <Building className="h-5 w-5" />,
      description: 'High-level system architecture and component relationships'
    },
    {
      id: 'workflow',
      title: 'Workflow Architecture',
      icon: <GitBranch className="h-5 w-5" />,
      description: 'Master/sub-workflow pattern and execution flow'
    },
    {
      id: 'components',
      title: 'Component Breakdown',
      icon: <Layers className="h-5 w-5" />,
      description: 'Individual workflow components and their responsibilities'
    },
    {
      id: 'dataflow',
      title: 'Data Flow',
      icon: <Database className="h-5 w-5" />,
      description: 'Data processing and transformation patterns'
    }
  ];

  const workflowComponents = [
    {
      name: 'Master Orchestrator',
      type: 'Core Controller',
      responsibilities: [
        'Request parsing and routing',
        'Sub-workflow coordination',
        'Result aggregation',
        'State management',
        'Error handling orchestration'
      ],
      connections: ['All sub-workflows'],
      color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
    },
    {
      name: 'Research Engine',
      type: 'Information Processing',
      responsibilities: [
        'Web search and scraping',
        'Content extraction',
        'Document processing',
        'Information validation',
        'Source management'
      ],
      connections: ['External APIs', 'Web Services'],
      color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
    },
    {
      name: 'Content Generator',
      type: 'AI Generation',
      responsibilities: [
        'Text generation via LLM APIs',
        'Image generation',
        'Content formatting',
        'Template processing',
        'Quality validation'
      ],
      connections: ['OpenAI', 'Anthropic', 'Image APIs'],
      color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
    },
    {
      name: 'Code Engine',
      type: 'Development Automation',
      responsibilities: [
        'Code generation and testing',
        'Repository management',
        'Deployment automation',
        'Version control integration',
        'Quality assurance'
      ],
      connections: ['Git APIs', 'CI/CD Systems'],
      color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
    },
    {
      name: 'Memory Manager',
      type: 'State Management',
      responsibilities: [
        'Session persistence',
        'Context management',
        'Data caching',
        'State synchronization',
        'Historical data storage'
      ],
      connections: ['Database', 'Cache Systems'],
      color: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700'
    },
    {
      name: 'Error Handler',
      type: 'Reliability System',
      responsibilities: [
        'Error detection and logging',
        'Retry mechanisms',
        'Fallback strategies',
        'Alert notifications',
        'Recovery procedures'
      ],
      connections: ['Logging Systems', 'Monitoring'],
      color: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
    }
  ];

  const architecturePrinciples = [
    {
      title: 'Modularity',
      description: 'Master/sub-workflow pattern promotes reusability and maintainability',
      icon: <Layers className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Scalability',
      description: 'Queue-based execution model allows horizontal scaling',
      icon: <Workflow className="h-6 w-6 text-green-600" />
    },
    {
      title: 'Separation of Concerns',
      description: 'Each sub-workflow handles a specific domain responsibility',
      icon: <Settings className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Reliability',
      description: 'Built-in error handling and recovery mechanisms',
      icon: <Globe className="h-6 w-6 text-orange-600" />
    }
  ];

  const dataFlowStages = [
    {
      stage: 'Input Processing',
      description: 'Request parsing and validation',
      components: ['Master Orchestrator'],
      dataTypes: ['User requests', 'Configuration parameters']
    },
    {
      stage: 'Information Gathering',
      description: 'Research and data collection',
      components: ['Research Engine', 'Memory Manager'],
      dataTypes: ['Web content', 'Documents', 'Historical data']
    },
    {
      stage: 'Content Generation',
      description: 'AI-powered content creation',
      components: ['Content Generator', 'Code Engine'],
      dataTypes: ['Generated text', 'Code', 'Images']
    },
    {
      stage: 'Output Aggregation',
      description: 'Result compilation and formatting',
      components: ['Master Orchestrator'],
      dataTypes: ['Final outputs', 'Status reports']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Architecture Viewer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          System architecture diagrams and detailed explanations of the N8N AI platform workflow design.
        </p>

        {/* Architecture Views */}
        <div className="flex flex-wrap gap-2">
          {architectureViews.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {view.icon}
              <span className="ml-2">{view.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <div className="space-y-8">
          {/* System Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              N8N AI Platform Architecture Overview
            </h2>
            
            {/* Architecture Diagram */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mb-4">
                  User Request
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-full flex justify-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-6 text-center max-w-md">
                    <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Master Orchestrator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Central coordination hub</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflowComponents.slice(1).map((component, index) => (
                  <div key={index} className={`border-2 rounded-xl p-4 text-center ${component.color}`}>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {component.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {component.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Architecture Principles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architecturePrinciples.map((principle, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3">{principle.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'workflow' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Workflow Architecture Pattern
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The N8N AI Platform uses a master/sub-workflow architecture pattern for optimal modularity, 
                scalability, and maintainability. This pattern separates concerns while enabling complex 
                orchestration of AI operations.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Execution Flow
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>User request received by Master Orchestrator</li>
                  <li>Request parsed and workflow strategy determined</li>
                  <li>Appropriate sub-workflows triggered in sequence or parallel</li>
                  <li>Sub-workflows execute specialized tasks</li>
                  <li>Results aggregated and processed by Master Orchestrator</li>
                  <li>Final response formatted and returned to user</li>
                </ol>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Benefits
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Improved maintainability</li>
                    <li>Easier testing and debugging</li>
                    <li>Horizontal scalability</li>
                    <li>Reusable components</li>
                    <li>Clear separation of concerns</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Implementation Features
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>Queue-based execution</li>
                    <li>Error handling cascade</li>
                    <li>State persistence</li>
                    <li>Parallel processing</li>
                    <li>Resource optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'components' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Workflow Component Breakdown
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Detailed breakdown of each workflow component, their responsibilities, and interconnections.
            </p>
          </div>
          
          {workflowComponents.map((component, index) => (
            <div key={index} className={`rounded-xl border-2 p-6 ${component.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {component.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {component.type}
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Responsibilities
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {component.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    External Connections
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {component.connections.map((connection, connIndex) => (
                      <span key={connIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                        {connection}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'dataflow' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Data Flow Architecture
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Understanding how data moves through the system from initial request to final output.
            </p>
            
            <div className="space-y-6">
              {dataFlowStages.map((stage, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {stage.stage}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 ml-12">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Components Involved
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.components.map((component, compIndex) => (
                          <span key={compIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Data Types
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {stage.dataTypes.map((dataType, typeIndex) => (
                          <li key={typeIndex}>{dataType}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {index < dataFlowStages.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureViewer;