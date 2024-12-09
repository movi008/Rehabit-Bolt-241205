import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PersonaGraph as PersonaGraphComponent } from '../../components/editor/PersonaGraph';

export function PersonaGraph() {
  const navigate = useNavigate();

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
              <h1 className="text-3xl font-bold text-gray-900">Persona Graph</h1>
              <p className="mt-2 text-gray-600">Visualize your persona's key attributes and relationships</p>
            </div>
          </div>
        </div>
        
        <PersonaGraphComponent />
      </div>
    </div>
  );
}