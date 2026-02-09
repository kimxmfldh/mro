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
        <div className="w-1/2 flex items-center justify-center p-12 bg-white">
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

        {/* Right Side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#0070d2] to-[#005fb2] relative overflow-hidden flex items-center justify-center p-12">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Gradient Circles */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
            </div>

            {/* Floating Character */}
            <div className="absolute top-1/4 left-12 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="relative">
                {/* Head */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 flex items-center justify-center">
                  {/* Eyes */}
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Body */}
                <div className="w-12 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mt-2"></div>
              </div>
            </div>

            {/* Floating Management Icons */}
            {/* Calendar Icon */}
            <div className="absolute top-1/3 right-20 animate-pulse" style={{ animationDuration: '2s' }}>
              <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="bg-white/30 h-3 rounded-t mb-1"></div>
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-white/40 rounded"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist Icon */}
            <div className="absolute top-1/2 left-20 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-1 border-b-2 border-l-2 border-white transform rotate-[-45deg] translate-y-[-1px]"></div>
                      </div>
                      <div className="flex-1 h-1.5 bg-white/40 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Icon */}
            <div className="absolute bottom-1/3 right-32 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>
              <div className="w-16 h-20 bg-white/15 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <div className="space-y-1.5">
                  <div className="h-1 bg-white/50 rounded w-3/4"></div>
                  <div className="h-1 bg-white/50 rounded w-full"></div>
                  <div className="h-1 bg-white/50 rounded w-2/3"></div>
                  <div className="h-1 bg-white/50 rounded w-full"></div>
                </div>
              </div>
            </div>

            {/* Gear Icon */}
            <div className="absolute bottom-1/4 left-32 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-full"></div>
                <div className="absolute inset-2 bg-white/10 rounded-full"></div>
                {/* Gear teeth */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-6 bg-white/20 backdrop-blur-sm left-1/2 top-0 -ml-1.5 origin-bottom"
                    style={{ transform: `rotate(${i * 45}deg) translateY(-8px)` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* IT/Computer Icon */}
            <div className="absolute top-1/2 right-16 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}>
              <div className="w-20 h-16 bg-white/15 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <div className="h-10 bg-white/20 rounded-t"></div>
                <div className="h-1 bg-white/30 mt-1 w-12 mx-auto"></div>
              </div>
            </div>

            {/* Truck Icon */}
            <div className="absolute bottom-1/3 left-24 animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '0.7s' }}>
              <div className="w-20 h-12 bg-white/15 backdrop-blur-sm rounded-lg shadow-lg relative">
                <div className="absolute top-2 left-2 w-8 h-6 bg-white/30 rounded"></div>
                <div className="absolute top-1 right-2 w-8 h-8 bg-white/30 rounded"></div>
                <div className="absolute bottom-0 left-3 w-3 h-3 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-white/40 rounded-full"></div>
              </div>
            </div>

            {/* Building Icon */}
            <div className="absolute top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '2.6s', animationDelay: '1.2s' }}>
              <div className="w-16 h-20 bg-white/15 backdrop-blur-sm rounded-t-lg shadow-lg">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-white/30 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg relative z-10">
            <h1 className="text-4xl font-bold mb-6">MRO 통합 관리 시스템</h1>
            <p className="text-lg text-white/90 mb-8">
              효율적인 시설·설비 유지·보수·운영 관리 플랫폼
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
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
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">21개 관리항목</h3>
                  <p className="text-sm text-white/80">자산, IT, 문서, 차량, 시설물 등 모든 업무 체계화</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">실시간 모니터링</h3>
                  <p className="text-sm text-white/80">대시보드와 통계로 즉각적인 현황 파악</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#0070d2] to-[#005fb2] relative overflow-hidden flex items-center justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0176d3]/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#005fb2]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Floating Character */}
          <div className="absolute top-16 left-16 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="relative">
              {/* Happy Face */}
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border-4 border-white/40 shadow-xl flex items-center justify-center relative">
                {/* Eyes */}
                <div className="flex gap-4 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Smile */}
                <div className="absolute bottom-4 left-1/2 -ml-4 w-8 h-4 border-b-2 border-white rounded-b-full"></div>
              </div>
              {/* Body */}
              <div className="w-14 h-20 bg-white/20 backdrop-blur-md rounded-full mx-auto mt-1 border-2 border-white/30"></div>
              {/* Arms */}
              <div className="absolute top-16 left-0 w-8 h-2 bg-white/20 rounded-full transform -rotate-45"></div>
              <div className="absolute top-16 right-0 w-8 h-2 bg-white/20 rounded-full transform rotate-45"></div>
            </div>
          </div>

          {/* Calendar Illustration */}
          <div className="absolute top-20 right-16 animate-pulse" style={{ animationDuration: '3s' }}>
            <div className="w-24 h-28 bg-white/15 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-white/30 h-6 flex items-center justify-center">
                <div className="text-xs font-bold text-white">2024</div>
              </div>
              {/* Calendar Grid */}
              <div className="p-2">
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        i === 7 ? 'bg-green-400' : 'bg-white/30'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist with Checkmarks */}
          <div className="absolute bottom-24 right-24 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
            <div className="w-32 h-36 bg-white/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-400 rounded flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 h-2 bg-white/40 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gear/Settings Icon */}
          <div className="absolute top-1/2 left-24 animate-spin" style={{ animationDuration: '12s' }}>
            <div className="w-20 h-20 relative">
              {/* Outer gear */}
              <div className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-full shadow-xl border border-white/20"></div>
              <div className="absolute inset-3 bg-white/10 rounded-full"></div>
              {/* Gear teeth */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-8 bg-white/20 backdrop-blur-sm left-1/2 top-0 -ml-2 origin-bottom"
                  style={{ transform: `rotate(${i * 45}deg) translateY(-10px)` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Computer/IT Icon */}
          <div className="absolute bottom-1/4 right-12 animate-pulse" style={{ animationDuration: '2.7s', animationDelay: '0.8s' }}>
            <div className="w-24 h-20 bg-white/15 backdrop-blur-md rounded-xl p-3 shadow-2xl border border-white/20">
              {/* Screen */}
              <div className="h-12 bg-white/20 rounded-t mb-1 flex items-center justify-center">
                <div className="w-16 h-8 bg-white/30 rounded"></div>
              </div>
              {/* Base */}
              <div className="h-1.5 bg-white/30 rounded w-16 mx-auto"></div>
            </div>
          </div>

          {/* Warning/Alert Icon */}
          <div className="absolute top-2/3 left-1/3 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.5s' }}>
            <div className="w-14 h-14 bg-yellow-400/80 backdrop-blur-md rounded-full shadow-xl border-2 border-white/30 flex items-center justify-center">
              <div className="text-white font-bold text-2xl">!</div>
            </div>
          </div>

          {/* Small Floating Dots */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
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
