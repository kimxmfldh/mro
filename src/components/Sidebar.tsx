import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, Bell, LogOut, Settings } from 'lucide-react';

interface SidebarProps {
  currentUser?: { name: string; role: string };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { path: '/checklist', icon: CheckSquare, label: '체크리스트' },
    { path: '/calendar', icon: Calendar, label: '캘린더', disabled: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-bg-sidebar border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-text-primary">MRO 관리 시스템</h1>
        <p className="text-sm text-text-secondary mt-1">통합 관리 플랫폼</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex items-center px-4 py-2.5 rounded-lg text-text-secondary/40 cursor-not-allowed">
                  <item.icon size={20} className="mr-3" />
                  <span className="text-sm">{item.label}</span>
                  <span className="ml-auto text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded">준비중</span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        {currentUser && (
          <div className="mb-3 px-2">
            <p className="font-medium text-sm text-text-primary">{currentUser.name}</p>
            <p className="text-xs text-text-secondary mt-0.5">{currentUser.role}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2.5 rounded-lg text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-all"
        >
          <LogOut size={18} className="mr-3" />
          <span className="text-sm">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
