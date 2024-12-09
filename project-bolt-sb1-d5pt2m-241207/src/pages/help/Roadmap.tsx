import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ThumbsUp, 
  MessageSquare, 
  Plus,
  X,
  Send,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { HelpFooter } from '../../components/help/HelpFooter';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: 'mindfulness' | 'meditation' | 'community' | 'personalization' | 'integration';
  status: 'planned' | 'in-progress' | 'completed';
  timeline: 'current' | 'next' | 'future';
  votes: number;
  hasVoted: boolean;
  comments: number;
}

interface RoadmapSuggestion {
  title: string;
  description: string;
  category: RoadmapItem['category'];
}

export function Roadmap() {
  const navigate = useNavigate();
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState<RoadmapSuggestion>({
    title: '',
    description: '',
    category: 'mindfulness'
  });
  const [selectedCategory, setSelectedCategory] = useState<RoadmapItem['category'] | 'all'>('all');
  const [selectedTimeline, setSelectedTimeline] = useState<RoadmapItem['timeline'] | 'all'>('all');

  const roadmapItems: RoadmapItem[] = [
    {
      id: '1',
      title: 'AI-Powered Meditation Generation',
      description: 'Create personalized meditation sessions using advanced AI algorithms',
      category: 'meditation',
      status: 'in-progress',
      timeline: 'current',
      votes: 156,
      hasVoted: false,
      comments: 23
    },
    {
      id: '2',
      title: 'Community Challenges & Events',
      description: 'Participate in group meditation challenges and mindfulness events',
      category: 'community',
      status: 'planned',
      timeline: 'next',
      votes: 89,
      hasVoted: true,
      comments: 15
    },
    {
      id: '3',
      title: 'Advanced Progress Analytics',
      description: 'Detailed insights and tracking of your mindfulness journey',
      category: 'personalization',
      status: 'completed',
      timeline: 'current',
      votes: 234,
      hasVoted: false,
      comments: 45
    },
    {
      id: '4',
      title: 'Wearable Device Integration',
      description: 'Connect with popular fitness trackers and smartwatches',
      category: 'integration',
      status: 'planned',
      timeline: 'future',
      votes: 178,
      hasVoted: false,
      comments: 32
    }
  ];

  const categories = [
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'community', label: 'Community' },
    { id: 'personalization', label: 'Personalization' },
    { id: 'integration', label: 'Integration' }
  ];

  const timelines = [
    { id: 'current', label: 'Current Sprint' },
    { id: 'next', label: 'Next Up' },
    { id: 'future', label: 'Future' }
  ];

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVote = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Voted for item:', itemId);
  };

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('Submitted suggestion:', suggestion);
    setShowSuggestionForm(false);
    setSuggestion({ title: '', description: '', category: 'mindfulness' });
  };

  const filteredItems = roadmapItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesTimeline = selectedTimeline === 'all' || item.timeline === selectedTimeline;
    return matchesCategory && matchesTimeline;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/help/changelog')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Product Roadmap</h1>
                  <p className="mt-2 text-gray-600">See what's coming next and share your ideas</p>
                </div>
                <button
                  onClick={() => setShowSuggestionForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Suggest Feature</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#007dff] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as RoadmapItem['category'])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#007dff] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeline('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeline === 'all'
                    ? 'bg-[#007dff] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Timelines
              </button>
              {timelines.map(timeline => (
                <button
                  key={timeline.id}
                  onClick={() => setSelectedTimeline(timeline.id as RoadmapItem['timeline'])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeline === timeline.id
                      ? 'bg-[#007dff] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {timeline.label}
                </button>
              ))}
            </div>
          </div>

          {/* Roadmap Items */}
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-[#007dff] transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {categories.find(c => c.id === item.category)?.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex items-start space-x-4 ml-6">
                      <button
                        onClick={() => handleVote(item.id)}
                        className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                          item.hasVoted
                            ? 'bg-[#007dff]/10 text-[#007dff]'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-sm mt-1">{item.votes}</span>
                      </button>
                      <button className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <span className="text-sm mt-1 text-gray-500">{item.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      {showSuggestionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Suggest a Feature</h3>
              <button
                onClick={() => setShowSuggestionForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitSuggestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feature Title
                </label>
                <input
                  type="text"
                  value={suggestion.title}
                  onChange={(e) => setSuggestion(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                  placeholder="Enter a clear title for your feature suggestion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={suggestion.description}
                  onChange={(e) => setSuggestion(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
                  placeholder="Describe your feature suggestion in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={suggestion.category}
                  onChange={(e) => setSuggestion(prev => ({ 
                    ...prev, 
                    category: e.target.value as RoadmapItem['category']
                  }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSuggestionForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                >
                  Submit Suggestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <HelpFooter />
    </div>
  );
}