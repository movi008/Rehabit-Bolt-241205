import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  Download,
  Share2,
  BarChart2,
  Calendar,
  Clock4,
  Target,
  Sparkles,
  X,
  Check,
  Youtube,
  Instagram,
  Music2,
  Link,
  Mail,
  Globe,
  Tv,
  Copy,
  Video,
  FileText,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { Project } from '../types';

interface Track {
  id: string;
  title: string;
  type: string;
  duration: string;
  status: 'completed' | 'processing' | 'pending';
  progress: number;
  lastPlayed?: string;
  completions: number;
}

interface VisionDashboardProps {
  project: Project;
  onClose: () => void;
}

export function VisionDashboard({ project, onClose }: VisionDashboardProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>('welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [linkCopied, setLinkCopied] = useState(false);
  const [includeInFeed, setIncludeInFeed] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const tracks: Track[] = [
    {
      id: 'welcome',
      title: 'Welcome to Your Vision',
      type: 'Welcome',
      duration: '2:30',
      status: 'completed',
      progress: 100,
      lastPlayed: '2024-03-10',
      completions: 15
    },
    {
      id: 'affirmation',
      title: 'Daily Affirmations',
      type: 'Affirmation',
      duration: '5:45',
      status: 'completed',
      progress: 75,
      lastPlayed: '2024-03-11',
      completions: 12
    },
    {
      id: 'meditation',
      title: 'Vision Meditation',
      type: 'Meditation',
      duration: '15:00',
      status: 'processing',
      progress: 45,
      lastPlayed: '2024-03-09',
      completions: 8
    },
    {
      id: 'closing',
      title: 'Closing Thoughts',
      type: 'Closing',
      duration: '3:15',
      status: 'pending',
      progress: 0,
      completions: 0
    }
  ];

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

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    setIsPlaying(true);
  };

  const stats = [
    { label: 'Total Duration', value: '26:30', icon: Clock4 },
    { label: 'Sessions Completed', value: '35', icon: Target },
    { label: 'Last Session', value: '2 hours ago', icon: Calendar },
    { label: 'Manifestation Score', value: '85%', icon: Sparkles }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <VideoPlayer />
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#007dff]/10 rounded-lg">
                        <stat.icon className="w-5 h-5 text-[#007dff]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
            </div>

            {/* Playlist */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vision Playlist</h3>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackSelect(track.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedTrack === track.id
                        ? 'bg-[#007dff]/10'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (selectedTrack === track.id) {
                              setIsPlaying(!isPlaying);
                            } else {
                              setSelectedTrack(track.id);
                              setIsPlaying(true);
                            }
                          }}
                          className={`p-2 rounded-full ${
                            selectedTrack === track.id && isPlaying
                              ? 'bg-[#007dff] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {selectedTrack === track.id && isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <h4 className="font-medium text-gray-900">{track.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{track.type}</span>
                            <span>•</span>
                            <span>{track.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {track.completions} plays
                        </div>
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#007dff] transition-all"
                            style={{ width: `${track.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
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