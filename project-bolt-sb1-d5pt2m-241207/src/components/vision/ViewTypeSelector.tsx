import React from 'react';
import { MessageSquare, Clock, Layout } from 'lucide-react';
import { ViewType } from '../../types';

interface ViewTypeSelectorProps {
  viewType: ViewType;
  onChange: (type: ViewType) => void;
}

export function ViewTypeSelector({ viewType, onChange }: ViewTypeSelectorProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
        <button
          onClick={() => onChange('classic')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            viewType === 'classic'
              ? 'bg-[#007dff] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Layout className="w-5 h-5" />
          <span>Classic</span>
        </button>
        <button
          onClick={() => onChange('chat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            viewType === 'chat'
              ? 'bg-[#007dff] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>
        <button
          onClick={() => onChange('realtime')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            viewType === 'realtime'
              ? 'bg-[#007dff] text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Realtime</span>
        </button>
      </div>
    </div>
  );
}