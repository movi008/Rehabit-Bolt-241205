import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Trash2, 
  Share2, 
  Info, 
  X, 
  Link, 
  Mail, 
  Copy, 
  Check, 
  Globe,
  Tv,
  Youtube,
  Instagram,
  Music2,
  Download,
  Video,
  FileText,
  Music,
  Image as ImageIcon,
  AlertTriangle,
  Calendar,
  Clock,
  Tag,
  BarChart2
} from 'lucide-react';
import { Project } from '../types';

interface ProjectMenuProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

export function ProjectMenu({ project, isOpen, onClose, position }: ProjectMenuProps) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showMetadata, setShowMetadata] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [showDownload, setShowDownload] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [includeInFeed, setIncludeInFeed] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState<{[key: string]: number}>({});

  if (!isOpen) return null;

  const handleManageProject = () => {
    navigate(`/manage-vision/${project.id}`);
    onClose();
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const handleDownload = () => {
    setShowDownload(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleViewMetadata = () => {
    setShowMetadata(true);
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

  const metadata = [
    { label: 'Created', value: project.date, icon: Calendar },
    { label: 'Duration', value: project.duration, icon: Clock },
    { label: 'Category', value: project.category, icon: Tag },
    { label: 'Status', value: project.status, icon: BarChart2 },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div
        className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-48"
        style={{
          top: position.y,
          left: position.x,
          transform: 'translateX(-90%)'
        }}
      >
        <button
          onClick={handleManageProject}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Manage</span>
        </button>
        <button
          onClick={handleShare}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
        <button
          onClick={handleDownload}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button
          onClick={handleViewMetadata}
          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Info className="w-4 h-4" />
          <span>Metadata</span>
        </button>
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>

      {/* Metadata Modal */}
      {showMetadata && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Info className="w-6 h-6 text-[#007dff]" />
                <h3 className="text-lg font-semibold text-gray-900">Project Metadata</h3>
              </div>
              <button
                onClick={() => setShowMetadata(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  {metadata.map((item) => (
                    <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{item.label}</span>
                      </div>
                      <p className="font-medium text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium text-gray-900">1,234</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Completions</span>
                    <span className="font-medium text-gray-900">567</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Average Watch Time</span>
                    <span className="font-medium text-gray-900">2:45</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowMetadata(false)}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Delete Vision</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this vision? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete
                  setShowDeleteConfirm(false);
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Vision
              </button>
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
    </>
  );
}