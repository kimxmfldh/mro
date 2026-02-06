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
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-end">
          <button className="relative p-2 text-gray-600 hover:text-primary transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
