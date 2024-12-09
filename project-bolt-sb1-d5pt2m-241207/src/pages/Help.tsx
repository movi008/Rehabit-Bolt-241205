import React, { useState, useEffect } from 'react';
import { 
  Book, 
  MessageCircle, 
  Video, 
  Users, 
  Mail,
  Phone,
  Search,
  PlayCircle,
  BookOpen,
  Lightbulb,
  Heart,
  Brain,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Clock,
  Calendar,
  Star,
  MessageSquare,
  HelpCircle,
  X
} from 'lucide-react';
import { HelpFooter } from '../components/help/HelpFooter';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  duration?: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  duration?: string;
  category: string;
}

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using Rehabit',
      icon: Book,
      articles: [
        {
          id: '1',
          title: 'Welcome to Rehabit',
          description: 'A quick introduction to the platform',
          type: 'video',
          duration: '2:30'
        },
        {
          id: '2',
          title: 'Creating Your First Vision',
          description: 'Step-by-step guide to vision creation',
          type: 'guide',
          duration: '5 min read'
        }
      ]
    },
    {
      id: 'meditation',
      title: 'Meditation & Mindfulness',
      description: 'Guides for meditation practices',
      icon: Brain,
      articles: [
        {
          id: '3',
          title: 'Meditation Basics',
          description: 'Learn fundamental meditation techniques',
          type: 'video',
          duration: '10:00'
        },
        {
          id: '4',
          title: 'Daily Mindfulness Practices',
          description: 'Incorporate mindfulness into your routine',
          type: 'article',
          duration: '8 min read'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community & Support',
      description: 'Connect with other members',
      icon: Users,
      articles: [
        {
          id: '5',
          title: 'Joining Group Sessions',
          description: 'How to participate in group meditations',
          type: 'guide',
          duration: '3 min read'
        },
        {
          id: '6',
          title: 'Community Guidelines',
          description: 'Our community values and rules',
          type: 'article',
          duration: '4 min read'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Meditation Guide', icon: Brain, color: 'bg-purple-100 text-purple-800' },
    { title: 'FAQ', icon: HelpCircle, color: 'bg-blue-100 text-blue-800' },
    { title: 'Video Tutorials', icon: PlayCircle, color: 'bg-red-100 text-red-800' },
    { title: 'Community Forum', icon: Users, color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const results: SearchResult[] = [];
      categories.forEach(category => {
        category.articles.forEach(article => {
          if (
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({
              ...article,
              category: category.title
            });
          }
        });
      });
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="w-full px-4 py-2 hover:bg-gray-50 text-left flex items-start space-x-3"
                        onClick={() => {
                          // Handle result click
                          setShowResults(false);
                        }}
                      >
                        {result.type === 'video' && <PlayCircle className="w-5 h-5 text-red-500 mt-1" />}
                        {result.type === 'article' && <BookOpen className="w-5 h-5 text-blue-500 mt-1" />}
                        {result.type === 'guide' && <Lightbulb className="w-5 h-5 text-yellow-500 mt-1" />}
                        <div>
                          <h3 className="font-medium text-gray-900">{result.title}</h3>
                          <p className="text-sm text-gray-500">{result.description}</p>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                            <span>{result.category}</span>
                            {result.duration && (
                              <>
                                <span>•</span>
                                <span>{result.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link) => (
              <button
                key={link.title}
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-[#007dff] transition-colors"
              >
                <div className={`p-2 rounded-lg ${link.color} mr-4`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">{link.title}</span>
              </button>
            ))}
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-[#007dff]/10 rounded-lg">
                      <category.icon className="w-5 h-5 text-[#007dff]" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="space-y-4">
                    {category.articles.map((article) => (
                      <button
                        key={article.id}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {article.type === 'video' && <PlayCircle className="w-5 h-5 text-red-500" />}
                          {article.type === 'article' && <BookOpen className="w-5 h-5 text-blue-500" />}
                          {article.type === 'guide' && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                          <div className="text-left">
                            <h3 className="font-medium text-gray-900">{article.title}</h3>
                            <p className="text-sm text-gray-500">{article.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{article.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-[#007dff]/5 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Need More Help?</h2>
              <p className="text-gray-600 mt-1">Our support team is available 24/7 to assist you</p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white text-[#007dff] rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5" />
                <span>Email Support</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Start Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <HelpFooter />
    </div>
  );
}