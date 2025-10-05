import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Workflow,
  Building,
  Rocket,
  BarChart3,
  Download,
  ArrowRight,
  CheckCircle,
  Zap,
  Code,
  Search,
  Cpu
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Workflow className="h-8 w-8 text-blue-600" />,
      title: "6 Production-Ready Workflows",
      description: "Master Orchestrator, Research Engine, Content Generator, Code Engine, Memory Manager, and Error Handler"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Comprehensive Documentation",
      description: "Complete guides, architecture diagrams, and implementation roadmaps for technical teams"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Platform Analysis",
      description: "Detailed comparison and capability mapping of Manus.im, Lovable.dev, ChatLLM, and MiniMax"
    },
    {
      icon: <Code className="h-8 w-8 text-orange-600" />,
      title: "Technical Implementation",
      description: "Ready-to-import JSON workflows with detailed setup instructions and API integrations"
    }
  ];

  const quickAccess = [
    {
      title: "Documentation Hub",
      description: "Browse all project documentation with search and navigation",
      icon: <BookOpen className="h-6 w-6" />,
      link: "/documentation",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700"
    },
    {
      title: "Workflow Explorer",
      description: "Interactive display of all 6 N8N workflows with JSON preview",
      icon: <Workflow className="h-6 w-6" />,
      link: "/workflows",
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700"
    },
    {
      title: "Architecture Viewer",
      description: "System architecture diagrams and explanations",
      icon: <Building className="h-6 w-6" />,
      link: "/architecture",
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700"
    },
    {
      title: "Implementation Guide",
      description: "Step-by-step deployment and setup instructions",
      icon: <Rocket className="h-6 w-6" />,
      link: "/implementation",
      color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700"
    },
    {
      title: "Platform Analysis",
      description: "Comparison of AI platforms and capabilities",
      icon: <BarChart3 className="h-6 w-6" />,
      link: "/analysis",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
    },
    {
      title: "Download Center",
      description: "Access complete project archive and individual files",
      icon: <Download className="h-6 w-6" />,
      link: "/downloads",
      color: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <Zap className="h-4 w-4 mr-2" />
          Complete AI Platform Replication System
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          N8N AI Platform
          <br className="hidden sm:block" />
          <span className="text-blue-600 dark:text-blue-400">Replication Guide</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          A comprehensive system for replicating advanced AI platform capabilities using N8N workflow automation. 
          Features production-ready workflows, detailed documentation, and complete implementation guides.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/workflows"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Explore Workflows
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/documentation"
            className="inline-flex items-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Quick Access
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccess.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`group p-6 border-2 rounded-xl transition-all duration-200 ${item.color}`}
            >
              <div className="flex items-center mb-3">
                <div className="mr-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Project Highlights */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Project Highlights
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Production-Ready Workflows
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <Workflow className="h-4 w-4 mr-2 text-blue-600" />
                Master Orchestrator for workflow coordination
              </li>
              <li className="flex items-center">
                <Search className="h-4 w-4 mr-2 text-green-600" />
                Research Engine with web search capabilities
              </li>
              <li className="flex items-center">
                <Code className="h-4 w-4 mr-2 text-purple-600" />
                Content Generator with AI integration
              </li>
              <li className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-orange-600" />
                Code Engine for development automation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Technical Documentation
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Comprehensive capability mapping</li>
              <li>Detailed implementation roadmap</li>
              <li>Platform feasibility assessment</li>
              <li>Architecture diagrams and workflows</li>
              <li>API integration guides</li>
              <li>Limitations and workaround strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;