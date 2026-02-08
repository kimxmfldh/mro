import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { ChevronDown } from 'lucide-react';
import { companies } from '../data/mockData';

interface LayoutProps {
  children: React.ReactNode;
  currentUser?: { name: string; role: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-bg-header border-b border-border z-50">
        <div className="h-full flex items-center px-6 justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="text-lg font-bold text-text-primary">MRO 시스템</h1>
            </div>

            {/* Company Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-border rounded-lg transition-colors"
              >
                <div className="text-left">
                  <p className="text-xs text-text-tertiary">관리 업체</p>
                  <p className="text-sm font-semibold text-text-primary">{selectedCompany.name}</p>
                </div>
                <ChevronDown size={16} className="text-text-secondary" />
              </button>

              {/* Company Dropdown */}
              {showCompanyMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowCompanyMenu(false)}
                  />
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-border rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase">
                        업체 선택
                      </div>
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
                            <div>
                              <p className="text-sm font-medium">{company.name}</p>
                              <p className="text-xs text-text-secondary">{company.industry}</p>
                            </div>
                            <span className="text-xs font-mono text-text-tertiary">{company.code}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Section - Search & User */}
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

            {/* User Profile */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
                  </div>
                  <ChevronDown size={16} className="text-text-secondary" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-20">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-border mb-2">
                          <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{currentUser.role}</p>
                        </div>
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
      </header>

      <Sidebar currentUser={currentUser} onLogout={onLogout} />

      {/* Main Content */}
      <div className="ml-60 mt-16">
        {/* Page Content */}
        <div className="p-8 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
