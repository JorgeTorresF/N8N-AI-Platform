import React, { useState } from 'react';
import { Rocket, CheckCircle, AlertCircle, Play, Settings, Database, Globe, Code, ArrowRight } from 'lucide-react';

interface ImplementationStep {
  id: string;
  title: string;
  description: string;
  commands?: string[];
  notes?: string[];
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
}

interface ImplementationPhase {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: ImplementationStep[];
}

const ImplementationGuide: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState('infrastructure');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const implementationPhases: ImplementationPhase[] = [
    {
      id: 'infrastructure',
      title: 'Core Infrastructure Setup',
      description: 'Set up the foundational N8N environment and infrastructure',
      icon: <Database className="h-6 w-6" />,
      steps: [
        {
          id: 'n8n-deploy',
          title: 'Deploy N8N in Queue-Based Configuration',
          description: 'Set up N8N with scalable queue-based execution for production workloads',
          priority: 'High',
          commands: [
            'docker run -d --name n8n-main -p 5678:5678 -e N8N_BASIC_AUTH_ACTIVE=true -e N8N_BASIC_AUTH_USER=admin -e N8N_BASIC_AUTH_PASSWORD=password n8nio/n8n',
            'docker run -d --name n8n-worker -e N8N_EXECUTION_MODE=queue n8nio/n8n worker',
          ],
          notes: [
            'Use Docker Compose for production deployments',
            'Configure environment variables for your specific setup',
            'Ensure proper network connectivity between containers'
          ]
        },
        {
          id: 'database-setup',
          title: 'Configure Production Database',
          description: 'Set up PostgreSQL database for N8N data persistence',
          priority: 'High',
          commands: [
            'docker run -d --name n8n-postgres -e POSTGRES_DB=n8n -e POSTGRES_USER=n8n -e POSTGRES_PASSWORD=password postgres:13',
            'docker run -d --name n8n-redis -p 6379:6379 redis:7-alpine'
          ],
          notes: [
            'Use managed database services for production (AWS RDS, Google Cloud SQL)',
            'Configure regular backups and monitoring',
            'Set up Redis for queue management and caching'
          ]
        },
        {
          id: 'reverse-proxy',
          title: 'Setup Reverse Proxy',
          description: 'Configure Nginx for secure access and load balancing',
          priority: 'High',
          commands: [
            'sudo apt update && sudo apt install nginx',
            'sudo systemctl enable nginx && sudo systemctl start nginx',
            'sudo certbot --nginx -d your-n8n-domain.com'
          ],
          notes: [
            'Configure SSL certificates with Let\'s Encrypt',
            'Set up proper security headers',
            'Configure rate limiting and DDoS protection'
          ]
        },
        {
          id: 'monitoring-setup',
          title: 'Implement Logging and Monitoring',
          description: 'Set up centralized logging and monitoring systems',
          priority: 'Medium',
          commands: [
            'docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.17.0',
            'docker run -d --name kibana -p 5601:5601 --link elasticsearch:elasticsearch kibana:7.17.0',
            'docker run -d --name prometheus -p 9090:9090 prom/prometheus'
          ],
          notes: [
            'Use ELK stack for log aggregation and analysis',
            'Set up Prometheus and Grafana for metrics monitoring',
            'Configure alerts for critical system events'
          ]
        },
        {
          id: 'version-control',
          title: 'Establish Version Control',
          description: 'Set up Git repository for workflow management',
          priority: 'Medium',
          commands: [
            'git init n8n-workflows',
            'git remote add origin https://your-git-repo.com/n8n-workflows.git',
            'git add . && git commit -m "Initial N8N workflow setup"'
          ],
          notes: [
            'Use Git hooks for automated workflow validation',
            'Implement branching strategy for development/production',
            'Set up automated backups of workflow configurations'
          ]
        }
      ]
    },
    {
      id: 'workflows',
      title: 'Foundational Sub-workflows',
      description: 'Deploy and configure the core workflow components',
      icon: <Rocket className="h-6 w-6" />,
      steps: [
        {
          id: 'research-workflow',
          title: 'Implement Research Sub-workflow',
          description: 'Deploy the research engine with web search and content extraction',
          priority: 'High',
          notes: [
            'Import research_engine.json workflow file',
            'Configure Google Search API credentials',
            'Set up web scraping endpoints and rate limiting',
            'Test document reading services for PDF/DOCX support'
          ]
        },
        {
          id: 'content-workflow',
          title: 'Deploy Content Generation Sub-workflow',
          description: 'Set up AI-powered content generation with LLM integration',
          priority: 'High',
          notes: [
            'Import content_generator.json workflow file',
            'Configure OpenAI API credentials and rate limits',
            'Set up image generation with DALL-E or Stability AI',
            'Implement content quality validation and filtering'
          ]
        },
        {
          id: 'master-orchestrator',
          title: 'Configure Master Orchestrator',
          description: 'Deploy the central coordination workflow',
          priority: 'High',
          notes: [
            'Import master_orchestrator.json workflow file',
            'Configure sub-workflow calling mechanisms',
            'Set up request routing and parsing logic',
            'Implement result aggregation and formatting'
          ]
        },
        {
          id: 'code-engine',
          title: 'Setup Code Engine Sub-workflow',
          description: 'Deploy development automation and code generation',
          priority: 'Medium',
          notes: [
            'Import code_engine.json workflow file',
            'Configure GitHub/GitLab API integration',
            'Set up automated testing and deployment pipelines',
            'Implement code quality checks and validation'
          ]
        },
        {
          id: 'memory-manager',
          title: 'Deploy Memory Manager',
          description: 'Set up state management and persistence',
          priority: 'Medium',
          notes: [
            'Import memory_manager.json workflow file',
            'Configure database connections for state storage',
            'Set up session management and context persistence',
            'Implement data cleanup and archival policies'
          ]
        },
        {
          id: 'error-handler',
          title: 'Implement Error Handler',
          description: 'Deploy comprehensive error handling and recovery',
          priority: 'High',
          notes: [
            'Import error_handler.json workflow file',
            'Configure error logging and notification systems',
            'Set up retry mechanisms and fallback strategies',
            'Implement automated recovery procedures'
          ]
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Capabilities',
      description: 'Implement advanced features and integrations',
      icon: <Settings className="h-6 w-6" />,
      steps: [
        {
          id: 'web-development',
          title: 'Web Development Sub-workflow',
          description: 'Set up automated web development capabilities',
          priority: 'Medium',
          notes: [
            'Integrate with Figma API for design specifications',
            'Configure code generation for React/Vue/Angular',
            'Set up automated testing and deployment',
            'Implement responsive design validation'
          ]
        },
        {
          id: 'multimodal',
          title: 'Multi-modal Processing',
          description: 'Implement image, video, and audio processing',
          priority: 'Medium',
          notes: [
            'Configure Google Vision API for image analysis',
            'Set up video processing with cloud services',
            'Implement audio transcription and analysis',
            'Add document OCR and text extraction'
          ]
        },
        {
          id: 'api-integrations',
          title: 'External API Integrations',
          description: 'Connect with third-party services and APIs',
          priority: 'Low',
          notes: [
            'Implement Slack, Discord, and Teams integrations',
            'Set up CRM and marketing automation connections',
            'Configure data analytics and reporting APIs',
            'Add social media platform integrations'
          ]
        }
      ]
    },
    {
      id: 'optimization',
      title: 'Optimization & Scaling',
      description: 'Optimize performance and prepare for scale',
      icon: <Globe className="h-6 w-6" />,
      steps: [
        {
          id: 'performance',
          title: 'Performance Optimization',
          description: 'Optimize workflow execution and resource usage',
          priority: 'High',
          notes: [
            'Implement execution data pruning strategies',
            'Optimize database queries and indexing',
            'Configure caching layers for frequently accessed data',
            'Set up workflow execution monitoring and profiling'
          ]
        },
        {
          id: 'scaling',
          title: 'Horizontal Scaling Setup',
          description: 'Configure system for horizontal scaling',
          priority: 'Medium',
          notes: [
            'Set up load balancing across multiple N8N instances',
            'Configure auto-scaling based on queue depth',
            'Implement distributed caching with Redis Cluster',
            'Set up database read replicas for improved performance'
          ]
        },
        {
          id: 'security',
          title: 'Security Hardening',
          description: 'Implement comprehensive security measures',
          priority: 'High',
          notes: [
            'Configure API authentication and authorization',
            'Set up network security and firewall rules',
            'Implement secrets management and rotation',
            'Configure audit logging and compliance monitoring'
          ]
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const selectedPhaseData = implementationPhases.find(phase => phase.id === selectedPhase);
  const totalSteps = implementationPhases.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedCount = completedSteps.size;
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Implementation Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Step-by-step deployment and setup instructions for the N8N AI Platform Replication system.
        </p>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Overall Progress
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {completedCount} of {totalSteps} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Phase Selection */}
        <div className="flex flex-wrap gap-2">
          {implementationPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPhase === phase.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {phase.icon}
              <span className="ml-2">{phase.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Phase Content */}
      {selectedPhaseData && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="text-blue-600 dark:text-blue-400 mr-3">
                {selectedPhaseData.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPhaseData.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedPhaseData.description}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="h-4 w-4 mr-1" />
              {selectedPhaseData.steps.filter(step => completedSteps.has(step.id)).length} of {selectedPhaseData.steps.length} steps completed in this phase
            </div>
          </div>

          {/* Implementation Steps */}
          <div className="space-y-4">
            {selectedPhaseData.steps.map((step, index) => (
              <div key={step.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start">
                  <button
                    onClick={() => toggleStepCompletion(step.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 mt-1 flex items-center justify-center transition-colors ${
                      completedSteps.has(step.id)
                        ? 'bg-green-600 border-green-600'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}
                  >
                    {completedSteps.has(step.id) && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        completedSteps.has(step.id) ? 'text-green-600 dark:text-green-400 line-through' : 'text-gray-900 dark:text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(step.priority)}`}>
                        {step.priority} Priority
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    
                    {step.commands && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Code className="h-4 w-4 mr-1" />
                          Commands
                        </h4>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
                          {step.commands.map((command, cmdIndex) => (
                            <pre key={cmdIndex} className="text-green-400 text-sm mb-2 last:mb-0">
                              <code>{command}</code>
                            </pre>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {step.notes && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Implementation Notes
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {step.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="text-sm text-gray-600 dark:text-gray-400">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phase Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => {
                const currentIndex = implementationPhases.findIndex(p => p.id === selectedPhase);
                if (currentIndex > 0) {
                  setSelectedPhase(implementationPhases[currentIndex - 1].id);
                }
              }}
              disabled={selectedPhase === implementationPhases[0].id}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Phase
            </button>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Phase {implementationPhases.findIndex(p => p.id === selectedPhase) + 1} of {implementationPhases.length}
            </span>
            
            <button
              onClick={() => {
                const currentIndex = implementationPhases.findIndex(p => p.id === selectedPhase);
                if (currentIndex < implementationPhases.length - 1) {
                  setSelectedPhase(implementationPhases[currentIndex + 1].id);
                }
              }}
              disabled={selectedPhase === implementationPhases[implementationPhases.length - 1].id}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Phase
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImplementationGuide;