import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <img src="/mro/logo.png" alt="MRO Logo" className="h-8 mr-3" />
          <h1 className="text-lg font-semibold text-[#16325c]">MRO</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Box */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#16325c] mb-2">로그인</h2>
              <p className="text-sm text-gray-600">MRO 통합 관리 시스템</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 이름
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0070d2] focus:border-transparent"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  암호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0070d2] focus:border-transparent"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#0070d2] focus:ring-[#0070d2] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  로그인 정보 저장
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#0070d2] hover:bg-[#005fb2] text-white font-medium py-2.5 px-4 rounded transition-colors"
              >
                로그인
              </button>
            </form>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-[#0070d2] hover:underline">
                암호를 잊으셨습니까?
              </a>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-xs text-gray-600">
            <p>테스트 계정: admin@example.com</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="text-center text-xs text-gray-600">
          © 2024 MRO Systems. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
