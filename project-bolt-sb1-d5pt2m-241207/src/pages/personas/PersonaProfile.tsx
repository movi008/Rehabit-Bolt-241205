import React, { useState } from 'react';
import { 
  ChevronLeft,
  Download,
  Share2,
  RefreshCw,
  Clock,
  ThumbsUp,
  ThumbsDown,
  History,
  Edit2,
  Bell,
  Coffee,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PersonaProfile() {
  const navigate = useNavigate();
  const [sliderValues, setSliderValues] = useState({
    extrovert: 30,
    analytical: 70,
    loyal: 80,
    passive: 40
  });

  const handleSliderChange = (name: string, value: number) => {
    setSliderValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Heart-Felt Team Leader</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]">
                Regenerate
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=800&q=80"
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote */}
            <div className="bg-[#007dff]/5 rounded-xl p-6">
              <p className="text-lg font-medium text-gray-900 italic">
                "I have a hard time hearing people that don't believe in themselves."
              </p>
            </div>

            {/* Codewords */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">CODEWORDS</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">Kind</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">Present</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">Patient</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-2 text-center">
                <p className="text-gray-900">60 • Semi-Retired Founder</p>
                <p className="text-gray-900">Committed Relationship</p>
                <p className="text-gray-900">Byron Bay, Australia</p>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Vision (Journey) Timeline</h3>
              <div className="relative pt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-3/4 bg-[#007dff] rounded-full" />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Jan 13, 2023</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Motivations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Motivations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#007dff] text-white rounded-lg">Supporting My Family</div>
                <div className="p-3 bg-[#007dff] text-white rounded-lg">Giving Back to Community</div>
                <div className="p-3 bg-[#007dff] text-white rounded-lg">Personal Recognition</div>
                <div className="p-3 bg-[#007dff] text-white rounded-lg">Personal Recognition</div>
                <div className="p-3 bg-[#007dff] text-white rounded-lg">Personal Recognition</div>
              </div>
            </div>

            {/* Personality */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Personality</h3>
              <div className="space-y-6">
                {Object.entries(sliderValues).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="capitalize">{key}</span>
                      <span>{value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleSliderChange(key, Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Content Boxes */}
            {['Mantra', 'Manifesto', 'Bio', 'Story'].map((title) => (
              <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-32 bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-400">{title.toLowerCase()} content ...</p>
                </div>
              </div>
            ))}

            {/* Symbols */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Symbols</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">Believe</span>
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Coffee className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Target className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <History className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <ThumbsDown className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}