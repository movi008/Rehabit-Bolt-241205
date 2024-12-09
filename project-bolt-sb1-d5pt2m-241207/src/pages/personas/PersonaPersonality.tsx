import React from 'react';
import { ChevronLeft, Brain, Heart, Users, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PersonaPersonality() {
  const navigate = useNavigate();

  const traits = [
    {
      category: 'Core Traits',
      icon: Brain,
      items: [
        { name: 'Openness', value: 75 },
        { name: 'Conscientiousness', value: 85 },
        { name: 'Extraversion', value: 60 },
        { name: 'Agreeableness', value: 80 },
        { name: 'Neuroticism', value: 45 }
      ]
    },
    {
      category: 'Emotional Intelligence',
      icon: Heart,
      items: [
        { name: 'Self-awareness', value: 82 },
        { name: 'Self-regulation', value: 78 },
        { name: 'Motivation', value: 88 },
        { name: 'Empathy', value: 85 },
        { name: 'Social Skills', value: 76 }
      ]
    },
    {
      category: 'Social Style',
      icon: Users,
      items: [
        { name: 'Communication', value: 80 },
        { name: 'Leadership', value: 72 },
        { name: 'Teamwork', value: 85 },
        { name: 'Conflict Resolution', value: 78 },
        { name: 'Adaptability', value: 83 }
      ]
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
              <h1 className="text-3xl font-bold text-gray-900">Persona Personality</h1>
              <p className="mt-2 text-gray-600">Define your persona's personality traits and characteristics</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {traits.map((section) => (
            <div
              key={section.category}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#007dff]/10 rounded-lg">
                    <section.icon className="w-6 h-6 text-[#007dff]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((trait) => (
                    <div key={trait.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">{trait.name}</span>
                        <span className="text-sm text-gray-500">{trait.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#007dff] transition-all"
                          style={{ width: `${trait.value}%` }}
                        />
                      </div>
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