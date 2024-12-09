import React from 'react';
import { History, ChevronLeft, ExternalLink, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HelpFooter } from '../../components/help/HelpFooter';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'removed';
    items: string[];
  }[];
}

export function Changelog() {
  const navigate = useNavigate();

  const changelog: ChangelogEntry[] = [
    {
      version: '0.8.13',
      date: 'March 16, 2024',
      changes: [
        {
          type: 'added',
          items: [
            'Added Bolt Changelog tracking system',
            'Created Windows feature for routine building',
            'Implemented Media Library template for asset management',
            'Added asset source toggle between user and AI-generated content'
          ]
        },
        {
          type: 'changed',
          items: [
            'Enhanced changelog organization with version numbering',
            'Improved media handling across all asset types',
            'Updated navigation structure for better organization'
          ]
        },
        {
          type: 'fixed',
          items: [
            'Fixed Layout component export issues',
            'Resolved editor menu item placement',
            'Fixed navigation menu organization'
          ]
        }
      ]
    },
    {
      version: '0.8.0',
      date: 'March 15, 2024',
      changes: [
        {
          type: 'added',
          items: [
            'Introduced AI-powered content generation',
            'Added new meditation templates',
            'Implemented team collaboration features',
            'Added comprehensive habit tracking system',
            'Introduced journal functionality with rich text support'
          ]
        },
        {
          type: 'changed',
          items: [
            'Redesigned dashboard interface',
            'Updated visualization algorithms',
            'Improved performance for large projects'
          ]
        }
      ]
    },
    {
      version: '0.7.0',
      date: 'March 1, 2024',
      changes: [
        {
          type: 'added',
          items: [
            'Initial release of Rehabit platform',
            'Core meditation and mindfulness features',
            'Basic project management capabilities',
            'User authentication system',
            'Profile management'
          ]
        },
        {
          type: 'changed',
          items: [
            'Enhanced user interface design',
            'Improved navigation system',
            'Optimized performance'
          ]
        }
      ]
    }
  ];

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'text-green-600 bg-green-50';
      case 'changed':
        return 'text-blue-600 bg-blue-50';
      case 'fixed':
        return 'text-yellow-600 bg-yellow-50';
      case 'removed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/help')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Changelog</h1>
                  <p className="mt-2 text-gray-600">Track our latest updates and improvements</p>
                </div>
                <button
                  onClick={() => navigate('/help/changelog/bolt')}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
                >
                  <span>Show Bolt Changelog</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {changelog.map((release) => (
              <div
                key={release.version}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Version {release.version}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{release.date}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {release.changes.map((change, index) => (
                      <div key={index}>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getChangeTypeColor(change.type)}`}>
                          {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                        </div>
                        <ul className="space-y-2">
                          {change.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-2">
                              <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-gray-400" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/help/roadmap')}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900"
            >
              <Map className="w-5 h-5" />
              <span>Show Roadmap</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <HelpFooter />
    </div>
  );
}