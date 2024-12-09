import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Play } from 'lucide-react';

export function PublicHome() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-xl font-bold text-[#007dff] font-comfortaa">rehabit</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLogin(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Login Form */}
        <div className="flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Get started'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {isLogin 
                ? 'Sign in to continue your journey'
                : 'Create an account to start manifesting your future'
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#007dff] focus:ring-[#007dff] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm text-[#007dff] hover:text-[#0066cc]">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
              >
                <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-[#007dff] hover:text-[#0066cc]"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="bg-[#007dff] flex items-center justify-center text-center p-8">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Realize Your Perfect Career
            </h2>
            <p className="text-white/90 mb-8">
              In 5 Minutes You can Craft a Clear, Inspiring Vision of the Future and Program your
              Life to Attract, Manifest and Hack the Reality of your Dreams.
            </p>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                  <Play className="w-8 h-8 text-[#007dff] ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}