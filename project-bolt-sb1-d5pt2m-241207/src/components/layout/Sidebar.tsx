import React from 'react';
import { menuGroups } from './menuConfig';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-[#007dff] text-white transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="mb-8">
          <span className="text-2xl font-bold text-white font-comfortaa">rehabit</span>
        </div>

        <div className="space-y-8">
          {menuGroups.map((group) => (
            <div key={group.title}>
              {group.title && (
                <div className="mb-2 text-white/80">
                  <span className="text-sm font-medium">{group.title}</span>
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => item.path && onNavigate(item.path)}
                    className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}