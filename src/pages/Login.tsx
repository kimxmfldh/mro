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

        {/* Right Side - Branding with Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#0070d2] to-[#005fb2] relative overflow-hidden flex items-center justify-center p-12 text-white">
          {/* Floating Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Circle */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Floating Cards */}
            <div className="absolute top-1/4 right-12 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="text-xs text-white/80">완료율</div>
                </div>
                <div className="text-2xl font-bold">87%</div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-24 w-40 h-28 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="text-xs text-white/80">오늘 마감</div>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
            </div>

            <div className="absolute top-1/2 right-32 w-36 h-24 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                  <div className="text-xs text-white/80">업체</div>
                </div>
                <div className="text-xl font-bold">4개</div>
              </div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-lg relative z-10">
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
