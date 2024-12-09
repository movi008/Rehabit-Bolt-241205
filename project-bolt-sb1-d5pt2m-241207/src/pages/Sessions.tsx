import React, { useState } from 'react';
import { 
  LogIn, 
  Eye, 
  MessageSquare, 
  Play, 
  Download,
  Share2,
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  Star,
  Video,
  FileText,
  Music,
  Image as ImageIcon
} from 'lucide-react';

interface Session {
  id: string;
  type: 'login' | 'view' | 'create' | 'generate' | 'download' | 'share';
  title: string;
  description: string;
  timestamp: string;
  duration?: string;
  icon: React.ElementType;
  metadata?: {
    projectType?: string;
    fileType?: string;
    platform?: string;
    status?: 'completed' | 'in-progress';
  };
}

const sessions: Session[] = [
  {
    id: '1',
    type: 'login',
    title: 'New Login Session',
    description: 'Logged in from Chrome on MacOS',
    timestamp: '2 minutes ago',
    icon: LogIn
  },
  {
    id: '2',
    type: 'create',
    title: 'Created Vision Project',
    description: 'Started a new vision project "Future of Technology"',
    timestamp: '15 minutes ago',
    icon: Eye,
    metadata: {
      projectType: 'Vision',
      status: 'in-progress'
    }
  },
  {
    id: '3',
    type: 'generate',
    title: 'Generated Meditation',
    description: 'Created "Morning Clarity" guided meditation',
    timestamp: '1 hour ago',
    duration: '15:00',
    icon: MessageSquare,
    metadata: {
      projectType: 'Meditation',
      status: 'completed'
    }
  },
  {
    id: '4',
    type: 'view',
    title: 'Watched Vision',
    description: 'Viewed "Sustainable Future" vision project',
    timestamp: '2 hours ago',
    duration: '3:45',
    icon: Play,
    metadata: {
      projectType: 'Vision'
    }
  },
  {
    id: '5',
    type: 'download',
    title: 'Downloaded Project Assets',
    description: 'Downloaded assets for "Personal Growth" project',
    timestamp: '3 hours ago',
    icon: Download,
    metadata: {
      fileType: 'Video'
    }
  },
  {
    id: '6',
    type: 'share',
    title: 'Shared Project',
    description: 'Shared "Career Vision" project on LinkedIn',
    timestamp: '5 hours ago',
    icon: Share2,
    metadata: {
      platform: 'LinkedIn',
      projectType: 'Vision'
    }
  }
];

const activityTypes = [
  { id: 'all', label: 'All Activity' },
  { id: 'login', label: 'Logins' },
  { id: 'create', label: 'Created' },
  { id: 'generate', label: 'Generated' },
  { id: 'view', label: 'Viewed' },
  { id: 'download', label: 'Downloads' },
  { id: 'share', label: 'Shared' }
];

export function Sessions() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const filteredSessions = sessions.filter(session => {
    const matchesType = selectedType === 'all' || session.type === selectedType;
    const matchesSearch = 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getActivityIcon = (type: Session['type']) => {
    switch (type) {
      case 'login': return LogIn;
      case 'view': return Eye;
      case 'create': return Star;
      case 'generate': return MessageSquare;
      case 'download': return Download;
      case 'share': return Share2;
      default: return Eye;
    }
  };

  const FileTypeIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video className="w-3 h-3 mr-1" />;
      case 'document': return <FileText className="w-3 h-3 mr-1" />;
      case 'audio': return <Music className="w-3 h-3 mr-1" />;
      case 'image': return <ImageIcon className="w-3 h-3 mr-1" />;
      default: return <FileText className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Activity History</h1>
          <p className="mt-2 text-gray-600">Track your sessions and activity across Rehabit</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  showFilters ? 'bg-[#007dff] text-white border-[#007dff]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    {dateRange === 'today' ? 'Today' :
                     dateRange === 'week' ? 'This Week' :
                     dateRange === 'month' ? 'This Month' : 'All Time'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {activityTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-[#007dff] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  session.type === 'login' ? 'bg-purple-100 text-purple-600' :
                  session.type === 'create' ? 'bg-blue-100 text-blue-600' :
                  session.type === 'generate' ? 'bg-green-100 text-green-600' :
                  session.type === 'view' ? 'bg-yellow-100 text-yellow-600' :
                  session.type === 'download' ? 'bg-pink-100 text-pink-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  <session.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-500">{session.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {session.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </div>
                      )}
                      <span>{session.timestamp}</span>
                    </div>
                  </div>
                  {session.metadata && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {session.metadata.projectType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {session.metadata.projectType}
                        </span>
                      )}
                      {session.metadata.fileType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <FileTypeIcon type={session.metadata.fileType} />
                          {session.metadata.fileType}
                        </span>
                      )}
                      {session.metadata.platform && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {session.metadata.platform}
                        </span>
                      )}
                      {session.metadata.status && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          session.metadata.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.metadata.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No activity found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}