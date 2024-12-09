import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { useAppSelector } from '../hooks';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();
  const theme = useAppSelector(state => state.ui.theme);

  const handleNavigation = (path: string) => {
    if (path) {
      navigate(path);
      // Remove this line to keep sidebar open during navigation
      // setShowDrawer(false);
    }
  };

  return (
    <div className={`min-h-screen flex overflow-hidden ${theme}`}>
      <Sidebar 
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        onNavigate={handleNavigation}
      />

      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          showDrawer ? 'ml-64' : 'ml-0'
        }`}
      >
        <Header 
          showDrawer={showDrawer}
          onMenuToggle={() => setShowDrawer(!showDrawer)}
          onNavigate={handleNavigation}
        />

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}