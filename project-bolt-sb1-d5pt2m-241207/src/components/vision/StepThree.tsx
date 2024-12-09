import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisionData } from '../../types/vision';
import { VideoPlayer } from '../VideoPlayer';
import { Play, Pause, Clock, Volume2, CheckCircle2, Settings } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  type: string;
  duration: string;
  status: 'completed' | 'processing' | 'pending';
}

interface StepThreeProps {
  visionData: VisionData;
}

export function StepThree({ visionData }: StepThreeProps) {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<string>('welcome');
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks: Track[] = [
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

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {visionData.title}
            </h2>
            <button
              onClick={() => navigate(`/manage-vision/${visionData.id}`)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Manage Vision</span>
            </button>
          </div>
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">{visionData.description}</p>
          </div>
          <VideoPlayer />

          {/* Playlist Table */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision Playlist</h3>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Controls
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tracks.map((track) => (
                    <tr 
                      key={track.id}
                      className={`${
                        selectedTrack === track.id ? 'bg-[#007dff]/5' : ''
                      } hover:bg-gray-50 cursor-pointer`}
                      onClick={() => handleTrackSelect(track.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {track.status === 'completed' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Ready
                          </span>
                        )}
                        {track.status === 'processing' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Processing
                          </span>
                        )}
                        {track.status === 'pending' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {track.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{track.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {track.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                            disabled={track.status !== 'completed'}
                            className="text-[#007dff] hover:text-[#0066cc] disabled:text-gray-400 disabled:cursor-not-allowed"
                          >
                            {selectedTrack === track.id && isPlaying ? (
                              <Pause className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            disabled={track.status !== 'completed'}
                            className="text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}