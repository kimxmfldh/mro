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
    <div className="fixed left-0 top-0 h-screen w-64 bg-primary-dark text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">MRO 관리 시스템</h1>
        <p className="text-sm text-white/70 mt-1">통합 관리 플랫폼</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex items-center px-4 py-3 rounded-lg text-white/40 cursor-not-allowed">
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded">준비중</span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        {currentUser && (
          <div className="mb-4">
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-sm text-white/70">{currentUser.role}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
