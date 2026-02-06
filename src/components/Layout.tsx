import React from 'react';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentUser?: { name: string; role: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {
  return (
    <div className="min-h-screen bg-bg-main">
      <Sidebar currentUser={currentUser} onLogout={onLogout} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-end">
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-gray-50">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
          </button>
        </div>

        {/* Page Content */}
        <div className="p-8 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
