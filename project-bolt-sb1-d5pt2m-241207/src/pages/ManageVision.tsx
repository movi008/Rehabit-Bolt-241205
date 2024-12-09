import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save,
  Trash2,
  AlertTriangle,
  Share2,
  Settings,
  X,
  Check,
  Download,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { TaxonomyManager } from '../components/taxonomy/TaxonomyManager';

export function ManageVision() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    navigate('/projects');
  };

  const handleBack = () => {
    navigate(-1);
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

  const contentGroups = {
    meta: {
      title: 'Meta',
      items: ['TimeSpace', 'TimeZone', 'Realm', 'World', 'Energy']
    },
    cards: {
      title: 'Cards',
      items: ['Welcome', 'Conclusion']
    },
    personas: {
      title: 'Personas',
      items: [
        { name: 'Graph', route: '/personas/graph' },
        { name: 'Profile', route: '/personas/profile' },
        { name: 'Motivations', route: '/personas/motivations' },
        { name: 'Personality', route: '/personas/personality' }
      ]
    },
    programs: {
      title: 'Programs',
      items: ['Affirmation', 'Afformation', 'Mantras', 'Manifesto', 'Keywords', 'Codewords']
    },
    meditations: {
      title: 'Meditations',
      items: ['Rising', 'Morning', 'Waking', 'Walking', 'Sleeping', 'Working']
    },
    stories: {
      title: 'Stories',
      items: ['Bio', 'Epic']
    },
    images: {
      title: 'Images',
      items: ['Avatar', 'Poster']
    },
    objects: {
      title: 'Objects',
      items: ['Symbols']
    },
    boards: {
      title: 'Boards',
      items: ['StoryBoard', 'VisionBoard', 'MoodBoard', 'ActionBoard']
    },
    sounds: {
      title: 'Sounds',
      items: ['Voiceovers', 'Solfeggio']
    },
    videos: {
      title: 'Videos',
      items: ['Poster', 'Animation', 'Loop']
    },
    reminders: {
      title: 'Reminders',
      items: ['Totems', 'Keys', 'Stickers', 'Posters', 'Wearables']
    }
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const handleItemClick = (route?: string) => {
    if (route) {
      navigate(route);
    }
  };

  const renderItems = (items: (string | { name: string; route: string })[]) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, index) => {
          const isObject = typeof item === 'object';
          const name = isObject ? item.name : item;
          const route = isObject ? item.route : undefined;
          
          return (
            <button
              key={index}
              onClick={() => handleItemClick(route)}
              className={`p-3 bg-white rounded-lg border border-gray-200 ${
                route ? 'hover:border-[#007dff] hover:bg-[#007dff]/5 cursor-pointer' : ''
              } transition-colors text-left`}
            >
              <span className="text-sm font-medium text-gray-900">{name}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Vision Project</h1>
              <p className="mt-2 text-gray-600">Configure and customize your vision project settings.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vision Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    defaultValue="My Vision Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
                    defaultValue="Vision description..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Taxonomy Manager */}
          <TaxonomyManager
            taxonomy={{
              categories: [
                { id: '1', name: 'Personal', slug: 'personal', type: 'category' },
                { id: '2', name: 'Professional', slug: 'professional', type: 'category' }
              ],
              spaces: [
                { id: '3', name: 'Home', slug: 'home', type: 'space' },
                { id: '4', name: 'Office', slug: 'office', type: 'space' }
              ],
              tags: [
                { id: '5', name: 'Growth', slug: 'growth', type: 'tag' },
                { id: '6', name: 'Success', slug: 'success', type: 'tag' }
              ]
            }}
            onUpdate={(updatedTaxonomy) => {
              console.log('Updated taxonomy:', updatedTaxonomy);
            }}
          />
        </div>

        {/* Content Management */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Content Management</h2>
            <div className="space-y-4">
              {Object.entries(contentGroups).map(([key, group]) => (
                <div key={key} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleGroup(key)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{group.title}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedGroups[key] ? 'transform rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedGroups[key] && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      {renderItems(group.items)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
            <button 
              onClick={() => setShowDownload(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-[#007dff] text-[#007dff] rounded-lg hover:bg-[#007dff]/5 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-[#007dff] text-[#007dff] rounded-lg hover:bg-[#007dff]/5 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete Vision</span>
          </button>
        </div>
      </div>

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
                onClick={handleDelete}
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
    </div>
  );
}