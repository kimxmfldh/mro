import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, FolderKanban, BarChart3, Settings, LogOut } from 'lucide-react';

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
    { path: '/categories', icon: FolderKanban, label: '관리항목' },
    { path: '/statistics', icon: BarChart3, label: '통계' },
    { path: '/settings', icon: Settings, label: '설정' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-bg-sidebar border-r border-border flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex items-center px-3 py-2 rounded-md text-text-tertiary cursor-not-allowed">
                  <item.icon size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm flex-1">{item.label}</span>
                  <span className="text-xs bg-gray-100 text-text-tertiary px-1.5 py-0.5 rounded">준비중</span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-all ${
                    isActive(item.path)
                      ? 'bg-primary-light/10 text-primary font-medium'
                      : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                  }`}
                >
                  <item.icon size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
