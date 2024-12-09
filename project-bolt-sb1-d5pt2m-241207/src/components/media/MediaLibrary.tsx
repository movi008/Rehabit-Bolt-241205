import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  Upload,
  SortAsc,
  Bot,
  User,
  Plus,
  Loader2,
  Trash2,
  MoreVertical,
  Download,
  Share2,
  Edit2,
  Star,
  Clock,
  Calendar,
  Tag,
  Play
} from 'lucide-react';

export type MediaType = 'image' | 'document' | 'audio' | 'video' | 'all';
export type ViewMode = 'grid' | 'list';
export type AssetSource = 'user' | 'ai';

interface MediaAsset {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  source: AssetSource;
  createdAt: string;
  size: string;
  duration?: string;
  format: string;
  tags: string[];
  starred: boolean;
  description?: string;
}

interface MediaLibraryProps {
  type: MediaType;
  title: string;
  description: string;
}

export function MediaLibrary({ type, title, description }: MediaLibraryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedSource, setSelectedSource] = useState<AssetSource>('user');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - in a real app, this would come from an API
  const assets: MediaAsset[] = [
    {
      id: '1',
      title: 'Morning Meditation Visual',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
      source: 'ai',
      createdAt: '2024-03-15',
      size: '2.4 MB',
      format: 'PNG',
      tags: ['meditation', 'wellness'],
      starred: true,
      description: 'AI-generated visualization for morning meditation'
    },
    {
      id: '2',
      title: 'Guided Meditation Audio',
      type: 'audio',
      url: '/meditations/morning-calm.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=400&q=80',
      source: 'ai',
      createdAt: '2024-03-14',
      size: '15.8 MB',
      duration: '15:30',
      format: 'MP3',
      tags: ['meditation', 'audio', 'morning'],
      starred: false,
      description: 'AI-generated morning meditation guidance'
    },
    {
      id: '3',
      title: 'Vision Board 2024',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=400&q=80',
      source: 'user',
      createdAt: '2024-03-14',
      size: '1.8 MB',
      format: 'JPG',
      tags: ['vision', 'goals'],
      starred: false,
      description: 'Personal vision board for the year ahead'
    },
    {
      id: '4',
      title: 'Mindfulness Session',
      type: 'video',
      url: '/videos/mindfulness-intro.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      source: 'user',
      createdAt: '2024-03-13',
      size: '45.2 MB',
      duration: '5:45',
      format: 'MP4',
      tags: ['mindfulness', 'tutorial'],
      starred: true,
      description: 'Introduction to mindfulness practices'
    },
    {
      id: '5',
      title: 'Meditation Journal',
      type: 'document',
      url: '/documents/meditation-journal.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80',
      source: 'user',
      createdAt: '2024-03-12',
      size: '2.1 MB',
      format: 'PDF',
      tags: ['journal', 'reflection'],
      starred: false,
      description: 'Personal meditation journal entries'
    },
    {
      id: '6',
      title: 'Nature Sounds',
      type: 'audio',
      url: '/audio/forest-ambience.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
      source: 'ai',
      createdAt: '2024-03-11',
      size: '25.6 MB',
      duration: '30:00',
      format: 'MP3',
      tags: ['nature', 'ambient', 'meditation'],
      starred: true,
      description: 'AI-generated forest ambience for meditation'
    },
    {
      id: '7',
      title: 'Breathing Exercise Guide',
      type: 'document',
      url: '/documents/breathing-techniques.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      source: 'user',
      createdAt: '2024-03-10',
      size: '1.5 MB',
      format: 'PDF',
      tags: ['breathing', 'guide', 'wellness'],
      starred: false,
      description: 'Comprehensive guide to breathing exercises'
    },
    {
      id: '8',
      title: 'Dream Visualization',
      type: 'video',
      url: '/videos/dream-sequence.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80',
      source: 'ai',
      createdAt: '2024-03-09',
      size: '85.3 MB',
      duration: '8:20',
      format: 'MP4',
      tags: ['dreams', 'visualization', 'ai-generated'],
      starred: true,
      description: 'AI-generated dream visualization sequence'
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesType = type === 'all' || asset.type === type;
    const matchesSource = asset.source === selectedSource;
    const matchesSearch = searchQuery ? (
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : true;
    return matchesType && matchesSource && matchesSearch;
  });

  // Rest of the component implementation remains the same
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>

        {/* Source Toggle */}
        <div className="mb-6">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setSelectedSource('user')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedSource === 'user'
                  ? 'bg-[#007dff] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span>User Created</span>
            </button>
            <button
              onClick={() => setSelectedSource('ai')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedSource === 'ai'
                  ? 'bg-[#007dff] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span>AI Generated</span>
            </button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
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
            <button
              onClick={() => setShowUploader(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
            >
              <Plus className="w-5 h-5" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className={`grid grid-cols-1 ${
          viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''
        } gap-6`}>
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative">
                <div className="aspect-video bg-gray-100">
                  {asset.thumbnail ? (
                    <img
                      src={asset.thumbnail}
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {asset.type === 'audio' && <Music className="w-12 h-12 text-gray-400" />}
                      {asset.type === 'document' && <FileText className="w-12 h-12 text-gray-400" />}
                      {asset.type === 'video' && <Play className="w-12 h-12 text-gray-400" />}
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  {asset.type === 'video' && (
                    <Play className="w-12 h-12 text-white" />
                  )}
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{asset.title}</h3>
                  {asset.source === 'ai' ? (
                    <Bot className="w-4 h-4 text-[#007dff]" />
                  ) : (
                    <User className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">{asset.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{asset.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {asset.duration && (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>{asset.duration}</span>
                      </>
                    )}
                    <span>{asset.size}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}