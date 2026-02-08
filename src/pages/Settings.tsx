import React from 'react';
import Card from '../components/common/Card';
import { User, Bell, Shield, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const settingSections = [
    {
      icon: User,
      title: '사용자 관리',
      description: '사용자 계정 및 권한 관리',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Bell,
      title: '알림 설정',
      description: '업무 알림 및 리마인더 설정',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Shield,
      title: '보안',
      description: '비밀번호 변경 및 보안 설정',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Palette,
      title: '테마',
      description: '화면 테마 및 표시 설정',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingSections.map((section) => (
          <Card
            key={section.title}
            className="hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-lg ${section.color} mr-4`}>
                <section.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">{section.title}</h3>
                <p className="text-sm text-text-secondary">{section.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* System Info */}
      <Card title="시스템 정보">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-sm text-text-secondary">버전</span>
            <span className="text-sm font-medium text-text-primary">v1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-sm text-text-secondary">마지막 업데이트</span>
            <span className="text-sm font-medium text-text-primary">2024-01-15</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-text-secondary">관리자 이메일</span>
            <span className="text-sm font-medium text-text-primary">admin@example.com</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
