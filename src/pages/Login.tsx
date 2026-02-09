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
        <img src="/mro/logo.png" alt="MRO Logo" className="h-8" />
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            {/* Login Box */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-[#16325c] mb-3">로그인</h2>
              <p className="text-gray-600">MRO 통합 관리 시스템</p>
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0070d2] focus:border-transparent"
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0070d2] focus:border-transparent"
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
                className="w-full bg-[#0070d2] hover:bg-[#005fb2] text-white font-medium py-3 px-4 rounded transition-colors shadow-sm"
              >
                로그인
              </button>
            </form>

            {/* Forgot Password */}
            <div className="mt-4">
              <a href="#" className="text-sm text-[#0070d2] hover:underline">
                암호를 잊으셨습니까?
              </a>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-sm text-gray-500">
              <p>테스트 계정: admin@example.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="w-1/2 bg-gradient-to-br from-[#0070d2] to-[#005fb2] flex items-center justify-center p-12 text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-6">MRO 통합 관리 시스템</h1>
            <p className="text-lg text-white/90 mb-8">
              효율적인 시설·설비 유지·보수·운영 관리 플랫폼
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">업체별 통합 관리</h3>
                  <p className="text-sm text-white/80">여러 업체의 MRO 업무를 하나의 플랫폼에서 관리</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">실시간 현황 파악</h3>
                  <p className="text-sm text-white/80">대시보드를 통한 즉각적인 업무 현황 확인</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">체계적인 업무 관리</h3>
                  <p className="text-sm text-white/80">21개 관리항목으로 모든 업무를 체계적으로 분류</p>
                </div>
              </div>
            </div>
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
