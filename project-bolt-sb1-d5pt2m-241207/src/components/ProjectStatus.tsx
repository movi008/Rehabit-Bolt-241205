import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface ProjectStatusProps {
  status: {
    script: boolean;
    voiceover: boolean;
    images: boolean;
    video: boolean;
  };
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const isComplete = Object.values(status).every(Boolean);

  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Project Status</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Project Progress</span>
          <span className="text-[#007dff] font-semibold">
            {Math.round(
              (Object.values(status).filter(Boolean).length / Object.values(status).length) * 100
            )}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#007dff] transition-all duration-500"
            style={{
              width: `${(Object.values(status).filter(Boolean).length / Object.values(status).length) * 100}%`
            }}
          ></div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            disabled={!isComplete}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
              isComplete 
                ? 'bg-[#007dff] hover:bg-[#0066cc] text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            disabled={!isComplete}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
              isComplete 
                ? 'bg-[#007dff] hover:bg-[#0066cc] text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}