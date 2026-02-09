import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentUser?: { name: string; role: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-bg-header border-b border-border z-50">
        <div className="h-full flex items-center px-6 justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img src="/mro/logo.png" alt="MRO Logo" className="h-8 mr-3" />
            <h1 className="text-lg font-bold text-text-primary">MRO 시스템</h1>
          </div>

          {/* Right Section - Search & Notification */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="w-96">
              <input
                type="text"
                placeholder="업무, 관리항목 검색..."
                className="w-full px-4 py-2 bg-bg-main border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Notification - Text Button */}
            <button className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors">
              알림
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      <Sidebar currentUser={currentUser} onLogout={onLogout} />

      {/* Main Content */}
      <div className="ml-60 mt-16 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Page Content */}
        <div className="p-8 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
