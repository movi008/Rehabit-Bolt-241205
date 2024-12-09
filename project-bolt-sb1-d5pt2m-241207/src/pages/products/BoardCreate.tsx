import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Layout, Image, Film, Zap } from 'lucide-react';

type BoardType = 'storyboard' | 'visionboard' | 'moodboard' | 'actionboard';

interface BoardOption {
  id: BoardType;
  title: string;
  description: string;
  icon: React.ElementType;
  placeholder: string;
}

export function BoardCreate() {
  const [selectedType, setSelectedType] = useState<BoardType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const boardOptions: BoardOption[] = [
    {
      id: 'storyboard',
      title: 'StoryBoard',
      description: 'Create a visual sequence of your narrative',
      icon: Film,
      placeholder: 'I want to create a storyboard that shows...'
    },
    {
      id: 'visionboard',
      title: 'VisionBoard',
      description: 'Visualize your goals and aspirations',
      icon: Layout,
      placeholder: 'I want to create a vision board that represents...'
    },
    {
      id: 'moodboard',
      title: 'MoodBoard',
      description: 'Capture the feeling and aesthetic',
      icon: Image,
      placeholder: 'I want to create a mood board that expresses...'
    },
    {
      id: 'actionboard',
      title: 'ActionBoard',
      description: 'Plan and track your key actions',
      icon: Zap,
      placeholder: 'I want to create an action board to achieve...'
    }
  ];

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const responses = {
        storyboard: "A compelling visual narrative unfolds across six panels:\n1. Opening shot: A sunrise over a modern cityscape\n2. Close-up: A determined face in deep concentration\n3. Action shot: Hands typing rapidly on a keyboard\n4. Wide shot: A team gathered around a whiteboard\n5. Detail shot: A breakthrough moment captured in expressions\n6. Closing shot: The team celebrating success",
        visionboard: "A powerful collection of aspirational images arranged in a grid:\n- Center: A stunning modern office space\n- Top: Professional achievement symbols\n- Right: Lifestyle and work-life balance imagery\n- Bottom: Learning and growth representations\n- Left: Community and team collaboration visuals",
        moodboard: "An evocative arrangement of colors, textures, and imagery:\n- Color palette: Deep blues, vibrant teals, warm grays\n- Textures: Sleek glass, warm wood, natural fibers\n- Typography: Modern, clean sans-serif fonts\n- Imagery: Urban landscapes, nature elements, human connections",
        actionboard: "A structured layout of key initiatives and tasks:\n1. Q1 Goals: Market research and team building\n2. Q2 Milestones: Product development phase\n3. Q3 Targets: Beta testing and feedback\n4. Q4 Objectives: Launch preparation and execution\nEach section includes specific action items and deadlines"
      };

      setResult(responses[selectedType!]);
    } catch (error) {
      console.error('Error generating board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Board"
      description="Design visual boards to organize and inspire your vision"
    >
      <div className="space-y-8">
        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedType(option.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#007dff] hover:bg-[#007dff]/5 transition-colors text-left"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-[#007dff]/10 rounded-lg">
                    <option.icon className="w-6 h-6 text-[#007dff]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#007dff]/10 rounded-lg">
                    {React.createElement(boardOptions.find(o => o.id === selectedType)?.icon || Layout, {
                      className: "w-6 h-6 text-[#007dff]"
                    })}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {boardOptions.find(o => o.id === selectedType)?.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {boardOptions.find(o => o.id === selectedType)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Back to Board Types
                </button>
              </div>

              <SimpleInput
                placeholder={boardOptions.find(o => o.id === selectedType)?.placeholder || ''}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                minRows={4}
              />

              {result && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Board</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{result}</p>
                  </div>
                  <div className="mt-6">
                    <VideoPlayer />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProductLayout>
  );
}