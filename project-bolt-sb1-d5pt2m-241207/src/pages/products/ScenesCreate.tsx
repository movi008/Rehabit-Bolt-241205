import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function ScenesCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("Scene 1: A serene mountain vista at sunrise, golden light spilling over the peaks...\n\nScene 2: A bustling city street coming to life, people starting their day with purpose...");
    } catch (error) {
      console.error('Error generating scenes:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Scenes"
      description="Create immersive story sequences for your vision"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Scenes
              </h2>
              <p className="text-gray-600">
                Share the story you want to tell through a sequence of scenes. Include settings, moods, and transitions.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to create scenes that..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Scenes</h3>
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
      </div>
    </ProductLayout>
  );
}