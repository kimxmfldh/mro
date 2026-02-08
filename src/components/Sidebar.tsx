import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, FolderKanban, BarChart3, Settings, ChevronDown } from 'lucide-react';
import { companies } from '../data/mockData';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

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
      {/* Company Selector */}
      <div className="px-3 pt-4 pb-3 border-b border-border">
        <div className="relative">
          <button
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-white hover:bg-gray-50 border border-border rounded-lg transition-colors"
          >
            <div className="text-left flex-1">
              <p className="text-xs text-text-tertiary mb-0.5">관리 업체</p>
              <p className="text-sm font-semibold text-text-primary truncate">{selectedCompany.name}</p>
            </div>
            <ChevronDown size={16} className="text-text-secondary flex-shrink-0 ml-2" />
          </button>

          {/* Company Dropdown */}
          {showCompanyMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowCompanyMenu(false)}
              />
              <div className="absolute left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
                <div className="p-2">
                  {companies.filter(c => c.isActive).map((company) => (
                    <button
                      key={company.id}
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowCompanyMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                        selectedCompany.id === company.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-50 text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{company.name}</p>
                          <p className="text-xs text-text-secondary truncate">{company.industry}</p>
                        </div>
                        <span className="text-xs font-mono text-text-tertiary ml-2">{company.code}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
