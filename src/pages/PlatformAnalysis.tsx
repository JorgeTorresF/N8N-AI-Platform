import React, { useState, useEffect } from 'react';
import { BarChart3, Search, ExternalLink, Star, TrendingUp, Zap, Shield, Users } from 'lucide-react';

interface PlatformData {
  name: string;
  category: string;
  description: string;
  strengths: string[];
  limitations: string[];
  n8nMapping: string;
  complexity: 'Low' | 'Medium' | 'High';
  feasibility: 'High' | 'Medium' | 'Low';
  url?: string;
}

const PlatformAnalysis: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const platformsData: PlatformData[] = [
    {
      name: 'Manus.im',
      category: 'Content Creation',
      description: 'AI-powered content generation platform with advanced multimodal capabilities for creating text, images, and interactive content.',
      strengths: [
        'Advanced multimodal AI processing',
        'Intuitive content generation interface',
        'High-quality output across multiple formats',
        'Real-time collaboration features',
        'Extensive template library'
      ],
      limitations: [
        'Limited API access for automation',
        'Proprietary content formats',
        'Subscription-based pricing model',
        'Limited customization options'
      ],
      n8nMapping: 'Content Generator + Research Engine sub-workflows with OpenAI/Anthropic integrations',
      complexity: 'Medium',
      feasibility: 'High',
      url: 'https://manus.im'
    },
    {
      name: 'Lovable.dev',
      category: 'Web Development',
      description: 'AI-powered web development platform that generates full-stack applications from natural language descriptions.',
      strengths: [
        'Full-stack application generation',
        'Modern framework support (React, Vue, etc.)',
        'Integrated deployment pipeline',
        'Version control integration',
        'Responsive design generation'
      ],
      limitations: [
        'Limited to specific tech stacks',
        'Complex customization requirements',
        'Learning curve for non-developers',
        'Dependency on external services'
      ],
      n8nMapping: 'Code Engine + Content Generator with GitHub/GitLab API integrations and deployment workflows',
      complexity: 'High',
      feasibility: 'Medium',
      url: 'https://lovable.dev'
    },
    {
      name: 'ChatLLM',
      category: 'Conversational AI',
      description: 'Advanced conversational AI platform with document processing, web search, and multi-modal interaction capabilities.',
      strengths: [
        'Natural conversation flows',
        'Document analysis and Q&A',
        'Web search integration',
        'Multi-language support',
        'Context-aware responses'
      ],
      limitations: [
        'Token usage limitations',
        'API rate limiting',
        'Context window constraints',
        'Cost per interaction model'
      ],
      n8nMapping: 'Master Orchestrator + Research Engine + Memory Manager with LLM API integrations',
      complexity: 'Medium',
      feasibility: 'High'
    },
    {
      name: 'MiniMax M1',
      category: 'AI Platform',
      description: 'Comprehensive AI platform offering text generation, image creation, voice synthesis, and multimodal processing capabilities.',
      strengths: [
        'Comprehensive AI model suite',
        'High-quality voice synthesis',
        'Advanced image generation',
        'Competitive pricing model',
        'Developer-friendly APIs'
      ],
      limitations: [
        'Regional availability constraints',
        'Documentation primarily in Chinese',
        'Limited community support',
        'Integration complexity'
      ],
      n8nMapping: 'All sub-workflows with MiniMax API integrations across text, image, and voice processing',
      complexity: 'Medium',
      feasibility: 'High'
    },
    {
      name: 'General AI Agent',
      category: 'AI Automation',
      description: 'Flexible AI agent platform capable of performing research, content creation, code generation, and workflow automation.',
      strengths: [
        'Multi-domain capability',
        'Workflow automation features',
        'Extensible architecture',
        'Integration flexibility',
        'Scalable processing'
      ],
      limitations: [
        'Generic approach limitations',
        'Configuration complexity',
        'Performance optimization needs',
        'Specialized domain constraints'
      ],
      n8nMapping: 'Complete N8N workflow suite with Master Orchestrator coordinating all specialized sub-workflows',
      complexity: 'High',
      feasibility: 'High'
    }
  ];

  const categories = ['All', ...Array.from(new Set(platformsData.map(platform => platform.category)))];

  const filteredPlatforms = platformsData.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const selectedPlatformData = platformsData.find(p => p.name === selectedPlatform);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive analysis and comparison of AI platforms with N8N implementation strategies and feasibility assessment.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search platforms..."
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

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{platformsData.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Platforms Analyzed</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {platformsData.filter(p => p.feasibility === 'High').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Feasibility</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {platformsData.filter(p => p.complexity === 'Medium').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Medium Complexity</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length - 1}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Platform Categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Platform List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Analyzed Platforms ({filteredPlatforms.length})
          </h2>
          
          {filteredPlatforms.map((platform, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPlatform === platform.name
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedPlatform(platform.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {platform.name}
                </h3>
                {platform.url && (
                  <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {platform.description.substring(0, 100)}...
              </p>
              
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                  {platform.category}
                </span>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${getComplexityColor(platform.complexity)}`}>
                    {platform.complexity}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getFeasibilityColor(platform.feasibility)}`}>
                    {platform.feasibility}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Details */}
        <div className="lg:col-span-2">
          {selectedPlatformData ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedPlatformData.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {selectedPlatformData.url && (
                      <a
                        href={selectedPlatformData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Site
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {selectedPlatformData.category}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getComplexityColor(selectedPlatformData.complexity)}`}>
                    {selectedPlatformData.complexity} Complexity
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getFeasibilityColor(selectedPlatformData.feasibility)}`}>
                    {selectedPlatformData.feasibility} Feasibility
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedPlatformData.description}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Strengths */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Star className="h-5 w-5 text-green-600 mr-2" />
                    Key Strengths
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedPlatformData.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Limitations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Shield className="h-5 w-5 text-orange-600 mr-2" />
                    Known Limitations
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedPlatformData.limitations.map((limitation, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400">
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* N8N Implementation Mapping */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-blue-600 mr-2" />
                    N8N Implementation Strategy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedPlatformData.n8nMapping}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a Platform
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a platform from the list to view detailed analysis, strengths, limitations, and N8N implementation strategy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalysis;