import React from 'react';
import { ChevronLeft, Target, Star, Zap, Award, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PersonaMotivations() {
  const navigate = useNavigate();

  const motivationCategories = [
    {
      title: 'Goals',
      icon: Target,
      items: ['Short-term goals', 'Long-term goals', 'Career objectives', 'Personal aspirations']
    },
    {
      title: 'Values',
      icon: Star,
      items: ['Core beliefs', 'Ethical principles', 'Cultural values', 'Personal standards']
    },
    {
      title: 'Drives',
      icon: Zap,
      items: ['Primary motivators', 'Internal drivers', 'External motivators', 'Key influences']
    },
    {
      title: 'Aspirations',
      icon: Award,
      items: ['Dreams', 'Ambitions', 'Desired achievements', 'Future vision']
    },
    {
      title: 'Passions',
      icon: Flame,
      items: ['Interests', 'Hobbies', 'Causes', 'Creative outlets']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Persona Motivations</h1>
              <p className="mt-2 text-gray-600">Understand what drives and inspires your persona</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motivationCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#007dff]/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-[#007dff]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}