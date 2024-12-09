import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  Compass, 
  Flame, 
  Clock, 
  ThumbsUp, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  views: string;
  timestamp: string;
  duration: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: 'explore', name: 'Explore', icon: Compass },
  { id: 'trending', name: 'Trending', icon: Flame },
  { id: 'recent', name: 'Recent', icon: Clock },
  { id: 'liked', name: 'Most Liked', icon: ThumbsUp },
];

const videos: Video[] = [
  {
    id: '1',
    title: 'The Future of AI: Transforming Creative Industries',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'TechVision',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100',
      verified: true
    },
    views: '1.2M',
    timestamp: '2 days ago',
    duration: '12:34'
  },
  {
    id: '2',
    title: 'Sustainable Cities: Building a Better Tomorrow',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'EcoFuture',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100',
      verified: true
    },
    views: '856K',
    timestamp: '5 days ago',
    duration: '18:21'
  },
  {
    id: '3',
    title: 'Mindfulness in the Digital Age',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'MindfulTech',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100',
      verified: false
    },
    views: '432K',
    timestamp: '1 week ago',
    duration: '15:45'
  },
  {
    id: '4',
    title: 'The Rise of Virtual Reality Experiences',
    thumbnail: 'https://images.unsplash.com/photo-1626387346567-68d0c49fc6b7?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'VR World',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100',
      verified: true
    },
    views: '1.5M',
    timestamp: '3 days ago',
    duration: '21:09'
  },
  {
    id: '5',
    title: 'Future of Work: Remote Collaboration Tools',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'WorkTech',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100',
      verified: true
    },
    views: '678K',
    timestamp: '1 week ago',
    duration: '14:52'
  },
  {
    id: '6',
    title: 'Quantum Computing Explained Simply',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    channel: {
      name: 'QuantumTech',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100',
      verified: true
    },
    views: '892K',
    timestamp: '4 days ago',
    duration: '16:37'
  }
];

export function TV() {
  const [selectedCategory, setSelectedCategory] = useState('explore');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Vision TV</h1>
              <p className="text-xl text-gray-600">
                Discover and explore inspiring visions from our global community
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Categories */}
            <div className="relative">
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div
                id="categories-container"
                className="flex space-x-2 overflow-x-auto scrollbar-hide relative px-8"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#007dff] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Selected Video Player */}
            {selectedVideo && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <VideoPlayer />
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedVideo.title}
                    </h2>
                    <div className="mt-2 flex items-center space-x-4">
                      <img
                        src={selectedVideo.channel.avatar}
                        alt={selectedVideo.channel.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedVideo.channel.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedVideo.views} views • {selectedVideo.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex space-x-3">
                      <img
                        src={video.channel.avatar}
                        alt={video.channel.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">
                            {video.channel.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {video.views} views • {video.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}