import { useState } from 'react';
import { Moon, Sun, Sparkles, ArrowRight, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthLandingPage() {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            isDark
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
              : 'bg-white hover:bg-gray-100 text-gray-600 shadow-lg'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}
          >
            <Sparkles size={28} className="text-white" />
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent'
            }`}
          >
            Get Started
          </h1>

          <p
            className={`text-lg md:text-xl max-w-md mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Welcome to your new AI companion. Sign up to unlock personalized conversations and advanced features.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          {/* Sign Up Button */}
          <button
            onClick={() => navigate('/loginsignup')}
            className={`w-full group relative overflow-hidden rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              isDark
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <UserPlus size={20} />
              <span className="text-lg">Sign up for free</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>

          {/* Login Button */}
          <button
            onClick={() => navigate('/loginsignup')}
            className={`w-full group relative overflow-hidden rounded-xl px-6 py-4 font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-white'
                : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-900 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="relative flex items-center justify-center space-x-2">
              <User size={20} />
              <span className="text-lg">Log in</span>
            </div>
          </button>

          {/* Try It First Button */}
          <button
            onClick={() => navigate('/quiz')}
            className={`w-full group relative overflow-hidden rounded-xl px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
            }`}
          >
            <div className="relative flex items-center justify-center space-x-2">
              <Sparkles size={18} />
              <span>Try it first</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-br from-purple-500 to-pink-500'
              : 'bg-gradient-to-br from-blue-200 to-purple-200'
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-br from-pink-500 to-purple-500'
              : 'bg-gradient-to-br from-purple-200 to-blue-200'
          }`}
        ></div>
      </div>
    </div>
  );
}
