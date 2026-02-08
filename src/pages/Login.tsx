import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">MRO 통합 관리 시스템</h1>
          <p className="text-sm text-text-secondary">로그인하여 시작하세요</p>
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
