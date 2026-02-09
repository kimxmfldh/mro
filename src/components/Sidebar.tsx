import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, FolderKanban, BarChart3, Settings, ChevronDown } from 'lucide-react';

interface SidebarProps {
  currentUser?: { name: string; role: string };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, onLogout }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems: Array<{ path: string; icon: any; label: string; disabled?: boolean }> = [
    { path: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
    { path: '/checklist', icon: CheckSquare, label: '체크리스트' },
    { path: '/calendar', icon: Calendar, label: '캘린더' },
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
              {item.disabled === true ? (
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

      {/* User Profile */}
      <div className="p-3 border-t border-border">
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{currentUser.name}</p>
                <p className="text-xs text-text-secondary">{currentUser.role}</p>
              </div>
              <ChevronDown size={16} className="text-text-secondary flex-shrink-0" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border border-border rounded-lg shadow-lg z-20">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary rounded-md transition-colors"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
