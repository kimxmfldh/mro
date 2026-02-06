import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">MRO 통합 관리 시스템</h1>
          <p className="text-text-secondary">로그인하여 시작하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">이메일</label>
            <Input
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="admin@example.com"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="비밀번호를 입력하세요"
              className="w-full"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            로그인
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          <p>테스트 계정: admin@example.com</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
