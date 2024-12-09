import React from 'react';
import { Plus, Box, MenuIcon, X } from 'lucide-react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  showDrawer: boolean;
  onMenuToggle: () => void;
  onNavigate: (path: string) => void;
}

export function Header({ showDrawer, onMenuToggle, onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#007dff] shadow-sm relative z-20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={onMenuToggle}
                className="p-1.5 text-white hover:bg-white/10 rounded-lg"
              >
                {showDrawer ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
              {!showDrawer && (
                <a href="/" className="flex items-center">
                  <span className="text-2xl font-bold text-white font-comfortaa">rehabit</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('/create')}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-[#007dff] rounded-lg hover:bg-white/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
              <button 
                onClick={() => onNavigate('/projects')}
                className="text-white/90 hover:text-white"
              >
                Projects
              </button>
              <button 
                onClick={() => onNavigate('/upgrade')}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-[#007dff] rounded-lg hover:bg-white/90 transition-colors"
              >
                <Box className="w-4 h-4" />
                <span>Upgrade</span>
              </button>
            </div>
            {/* User Menu - Always visible */}
            <UserMenu onNavigate={onNavigate} isMobile={window.innerWidth < 768} />
          </div>
        </div>
      </nav>
    </header>
  );
}