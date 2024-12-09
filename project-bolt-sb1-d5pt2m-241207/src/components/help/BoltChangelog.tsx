import React from 'react';
import { History, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HelpFooter } from './HelpFooter';
import { changelogTracker } from '../../lib/changelog';
import { BoltChangeEntry } from '../../types/changelog';

export function BoltChangelog() {
  const navigate = useNavigate();
  const changelog = changelogTracker.getEntries();

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'text-green-600 bg-green-50';
      case 'changed':
        return 'text-blue-600 bg-blue-50';
      case 'fixed':
        return 'text-yellow-600 bg-yellow-50';
      case 'updated':
        return 'text-purple-600 bg-purple-50';
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
                onClick={() => navigate('/help/changelog')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bolt Changelog</h1>
                <p className="mt-2 text-gray-600">Track changes and improvements made through user interactions</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {changelog.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Change #{entry.id}</h2>
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 italic">"{entry.userRequest}"</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {entry.changes.map((change, index) => (
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
        </div>
      </div>
      <HelpFooter />
    </div>
  );
}