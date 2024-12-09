import React, { useState, useEffect } from 'react';
import { Settings, Gift, Code, HelpCircle, LogOut, Plus, Box } from 'lucide-react';

interface UserMenuProps {
  onNavigate: (path: string) => void;
  isMobile: boolean;
}

export function UserMenu({ onNavigate, isMobile }: UserMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const getInitials = () => {
    if (username) {
      return username.slice(0, 2).toUpperCase();
    }
    return 'JD';
  };

  const handleLogout = () => {
    onNavigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
      >
        <span className="text-lg font-semibold text-[#007dff]">{getInitials()}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2">
          <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="font-semibold text-gray-900">{username || 'john.doe@example.com'}</p>
          </div>
          
          {/* Mobile-only navigation items */}
          {isMobile && (
            <div className="py-1 border-b">
              <button 
                onClick={() => {
                  onNavigate('/create');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create New</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('/projects');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Box className="w-5 h-5" />
                <span>Projects</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('/upgrade');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Gift className="w-5 h-5" />
                <span>Upgrade</span>
              </button>
            </div>
          )}

          <div className="py-1">
            <button 
              onClick={() => {
                onNavigate('/profile');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => {
                onNavigate('/settings');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button 
              onClick={() => {
                onNavigate('/referrals');
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Gift className="w-5 h-5" />
              <span>Referrals</span>
            </button>
            <div className="border-t mt-1 pt-1">
              <button 
                onClick={() => {
                  onNavigate('/developer');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Code className="w-5 h-5" />
                <span>Developer</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('/help');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help</span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}