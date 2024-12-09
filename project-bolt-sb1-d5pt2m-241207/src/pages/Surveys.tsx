import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Search, 
  Filter, 
  Heart,
  Calendar,
  Lightbulb,
  Smile,
  Leaf,
  Star,
  Mountain,
  Brain,
  Target,
  Compass,
  Clock,
  Shield,
  BarChart2,
  BookOpen
} from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  questions: number;
  completions: number;
  lastUpdated: string;
  thumbnail: string;
}

export function Surveys() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const surveys: Survey[] = [
    {
      id: '1',
      title: 'Life Events Timeline',
      description: 'Map significant moments that shaped your journey',
      icon: Calendar,
      questions: 15,
      completions: 245,
      lastUpdated: '2024-03-12',
      thumbnail: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Personal Stories',
      description: 'Document your most meaningful experiences',
      icon: BookOpen,
      questions: 12,
      completions: 189,
      lastUpdated: '2024-03-11',
      thumbnail: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      title: 'Core Values',
      description: 'Identify principles that guide your decisions',
      icon: Star,
      questions: 20,
      completions: 312,
      lastUpdated: '2024-03-10',
      thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '4',
      title: 'Emotional Intelligence',
      description: 'Understand your emotional patterns and triggers',
      icon: Heart,
      questions: 25,
      completions: 278,
      lastUpdated: '2024-03-09',
      thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '5',
      title: 'Life Seasons',
      description: 'Reflect on different phases of your journey',
      icon: Leaf,
      questions: 18,
      completions: 156,
      lastUpdated: '2024-03-08',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '6',
      title: 'Personal Challenges',
      description: 'Identify obstacles and growth opportunities',
      icon: Mountain,
      questions: 15,
      completions: 198,
      lastUpdated: '2024-03-07',
      thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '7',
      title: 'Finding Your Why',
      description: 'Discover your deeper motivations and purpose',
      icon: Lightbulb,
      questions: 22,
      completions: 267,
      lastUpdated: '2024-03-06',
      thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '8',
      title: 'Emotional Landscape',
      description: 'Map your emotional experiences and patterns',
      icon: Smile,
      questions: 20,
      completions: 234,
      lastUpdated: '2024-03-05',
      thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '9',
      title: 'Personal Needs Assessment',
      description: 'Identify what you need to thrive',
      icon: Target,
      questions: 16,
      completions: 189,
      lastUpdated: '2024-03-04',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '10',
      title: 'Life Direction',
      description: 'Clarify your path and future aspirations',
      icon: Compass,
      questions: 18,
      completions: 223,
      lastUpdated: '2024-03-03',
      thumbnail: 'https://images.unsplash.com/photo-1492138786289-d35ea832da43?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '11',
      title: 'Growth Timeline',
      description: 'Track your personal development journey',
      icon: Clock,
      questions: 14,
      completions: 167,
      lastUpdated: '2024-03-02',
      thumbnail: 'https://images.unsplash.com/photo-1498019559366-a1cbd07b5160?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '12',
      title: 'Core Strengths',
      description: 'Discover and leverage your unique abilities',
      icon: Shield,
      questions: 24,
      completions: 289,
      lastUpdated: '2024-03-01',
      thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Surveys</h1>
          <p className="mt-2 text-gray-600">Explore and complete surveys to gain deeper insights</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters ? 'bg-[#007dff] text-white border-[#007dff]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="bg-white border border-gray-200 rounded-lg flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={survey.thumbnail}
                    alt={survey.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white">
                      <survey.icon className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">{survey.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{survey.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{survey.completions} completions</span>
                    <span>{survey.questions} questions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex">
                  <div className="relative w-48 overflow-hidden">
                    <img
                      src={survey.thumbnail}
                      alt={survey.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="p-2 bg-[#007dff]/10 rounded-lg">
                        <survey.icon className="w-5 h-5 text-[#007dff]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{survey.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{survey.questions} questions</span>
                      <span>{survey.completions} completions</span>
                      <span>Updated {survey.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}