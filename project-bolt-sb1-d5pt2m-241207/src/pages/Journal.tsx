import React, { useState } from 'react';
import { 
  Camera, 
  Video, 
  Mic, 
  Lock, 
  Unlock, 
  ChevronDown, 
  X, 
  Image as ImageIcon,
  FileText,
  Music,
  Calendar,
  Tag,
  MapPin,
  Smile,
  Sun,
  Moon,
  Cloud,
  ThermometerSun,
  Eye,
  EyeOff,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  Clock,
  Star,
  Heart,
  MessageCircle,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  type: 'freestyle' | 'prompt';
  prompt?: string;
  date: string;
  mood?: string;
  weather?: string;
  location?: string;
  tags: string[];
  isEncrypted: boolean;
  attachments: {
    type: 'image' | 'video' | 'audio';
    url: string;
  }[];
}

export function Journal() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  const prompts = [
    { id: 'freestyle', label: 'Freestyle', icon: Edit2 },
    { id: 'gratitude', label: 'Daily Gratitude', icon: Heart },
    { id: 'reflection', label: 'Evening Reflection', icon: Moon },
    { id: 'goals', label: 'Goals & Intentions', icon: Star },
    { id: 'dream', label: 'Dream Journal', icon: Cloud },
    { id: 'mood', label: 'Mood Check-in', icon: Smile }
  ];

  const entries: JournalEntry[] = [
    {
      id: '1',
      title: 'Morning Reflections',
      content: 'Today started with a beautiful sunrise...',
      type: 'freestyle',
      date: '2024-03-15',
      mood: 'Peaceful',
      weather: 'Sunny',
      location: 'Home',
      tags: ['morning', 'gratitude'],
      isEncrypted: false,
      attachments: []
    },
    {
      id: '2',
      title: 'Evening Thoughts',
      content: 'Reflecting on today\'s achievements...',
      type: 'prompt',
      prompt: 'Evening Reflection',
      date: '2024-03-14',
      mood: 'Content',
      weather: 'Clear',
      location: 'Home Office',
      tags: ['reflection', 'growth'],
      isEncrypted: true,
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle entry submission
    console.log({ title, content, isEncrypted, selectedPrompt });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Journal</h1>
          <p className="mt-2 text-gray-600">Document your thoughts, feelings, and experiences</p>
        </div>

        {/* Entry Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowPrompts(!showPrompts)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <span>{selectedPrompt ? prompts.find(p => p.id === selectedPrompt)?.label : 'Freestyle'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showPrompts && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-10">
                      {prompts.map((prompt) => (
                        <button
                          key={prompt.id}
                          onClick={() => {
                            setSelectedPrompt(prompt.id);
                            setShowPrompts(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <prompt.icon className="w-4 h-4" />
                          <span>{prompt.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsEncrypted(!isEncrypted)}
                  className={`p-2 rounded-lg transition-colors ${
                    isEncrypted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isEncrypted ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Camera className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title (Optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
              />
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Entries List */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search entries..."
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

        {/* Entries Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {entry.isEncrypted && (
                      <Lock className="w-4 h-4 text-green-600" />
                    )}
                    <h3 className="font-medium text-gray-900">{entry.title || 'Untitled Entry'}</h3>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{entry.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{entry.date}</span>
                    {entry.mood && (
                      <span className="flex items-center space-x-1">
                        <Smile className="w-4 h-4" />
                        <span>{entry.mood}</span>
                      </span>
                    )}
                  </div>
                  {entry.location && (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}