import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  X, 
  Check, 
  Video, 
  FileText, 
  Music, 
  Image as ImageIcon,
  Youtube,
  Instagram,
  Music2,
  Mail,
  Globe,
  Tv,
  Copy,
  Link
} from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { ProjectStatus } from '../components/ProjectStatus';
import { AIProcessingSteps } from '../components/AIProcessingSteps';
import { Project } from '../types';

export function ProjectDashboard() {
  const { id } = useParams();
  const [selectedTrack, setSelectedTrack] = useState<string>('welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [linkCopied, setLinkCopied] = useState(false);
  const [includeInFeed, setIncludeInFeed] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  // This would normally come from an API call using the ID
  const project: Project = {
    id: id || '1',
    title: 'AI in Creative Industries',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    date: '2024-03-10',
    duration: '2:15',
    tags: ['AI', 'Creative', 'Technology'],
    category: 'Technology'
  };

  const downloadAssets = {
    video: {
      icon: Video,
      label: 'Final Video',
      format: 'MP4',
      size: '250 MB'
    },
    script: {
      icon: FileText,
      label: 'Vision Script',
      format: 'PDF',
      size: '156 KB'
    },
    audio: {
      icon: Music,
      label: 'Audio Track',
      format: 'MP3',
      size: '45 MB'
    },
    images: {
      icon: ImageIcon,
      label: 'Vision Images',
      format: 'ZIP',
      size: '125 MB'
    }
  };

  const simulateDownload = (assetType: string) => {
    setDownloadProgress(prev => ({ ...prev, [assetType]: 0 }));
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[assetType] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [assetType]: currentProgress + 10 };
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setDownloadProgress(prev => ({ ...prev, [assetType]: 100 }));
    }, 3000);
  };

  const tracks = [
    {
      id: 'welcome',
      title: 'Welcome to Your Vision',
      type: 'Welcome',
      duration: '2:30',
      status: 'completed'
    },
    {
      id: 'affirmation',
      title: 'Daily Affirmations',
      type: 'Affirmation',
      duration: '5:45',
      status: 'completed'
    },
    {
      id: 'meditation',
      title: 'Vision Meditation',
      type: 'Meditation',
      duration: '15:00',
      status: 'processing'
    },
    {
      id: 'closing',
      title: 'Closing Thoughts',
      type: 'Closing',
      duration: '3:15',
      status: 'pending'
    }
  ];

  const stats = [
    { label: 'Total Duration', value: '26:30' },
    { label: 'Sessions Completed', value: '35' },
    { label: 'Last Session', value: '2 hours ago' },
    { label: 'Manifestation Score', value: '85%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <div className="mt-2 flex items-center space-x-4 text-gray-600">
            <span>{project.duration}</span>
            <span>•</span>
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer />

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowDownload(true)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
              <button 
                onClick={() => setShowShare(true)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Playlist */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vision Playlist</h2>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedTrack === track.id ? 'bg-[#007dff]/10' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTrack(track.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{track.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{track.type}</span>
                          <span>•</span>
                          <span>{track.duration}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        track.status === 'completed' ? 'bg-green-100 text-green-800' :
                        track.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProjectStatus 
              status={{
                script: true,
                voiceover: true,
                images: true,
                video: true
              }}
            />
            <AIProcessingSteps 
              status={{
                script: true,
                voiceover: true,
                images: true,
                video: false
              }}
            />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Share Project</h3>
              <button
                onClick={() => setShowShare(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Share Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Tv className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Include in Rehabit.tv</p>
                      <p className="text-sm text-gray-500">Share with the community</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={includeInFeed}
                      onChange={(e) => setIncludeInFeed(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#007dff]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007dff]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Public Access</p>
                      <p className="text-sm text-gray-500">Anyone with the link can view</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#007dff]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007dff]"></div>
                  </label>
                </div>
              </div>

              {/* Share Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Link
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 truncate">
                    https://rehabit.ai/project/672tf72cc45df5242
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://rehabit.ai/project/672tf72cc45df5242');
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                    className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors flex items-center space-x-2"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Share */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share on Social Media
                </label>
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <span>YouTube</span>
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <span>Instagram</span>
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Music2 className="w-5 h-5 text-black" />
                    <span>TikTok</span>
                  </button>
                </div>
              </div>

              {/* Email Invite */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invite by Email
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    />
                  </div>
                  <button className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-[#007dff]" />
                <h3 className="text-lg font-semibold text-gray-900">Download Assets</h3>
              </div>
              <button
                onClick={() => setShowDownload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(downloadAssets).map(([key, asset]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg">
                      <asset.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{asset.label}</p>
                      <p className="text-sm text-gray-500">
                        {asset.format} • {asset.size}
                      </p>
                    </div>
                  </div>
                  {downloadProgress[key] === undefined ? (
                    <button
                      onClick={() => simulateDownload(key)}
                      className="px-3 py-1.5 text-[#007dff] hover:bg-[#007dff]/5 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  ) : downloadProgress[key] === 100 ? (
                    <span className="text-green-600 flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>Complete</span>
                    </span>
                  ) : (
                    <div className="w-24">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#007dff] transition-all duration-300"
                          style={{ width: `${downloadProgress[key]}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => {
                  Object.keys(downloadAssets).forEach(key => simulateDownload(key));
                }}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download All</span>
              </button>
              <button
                onClick={() => setShowDownload(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}