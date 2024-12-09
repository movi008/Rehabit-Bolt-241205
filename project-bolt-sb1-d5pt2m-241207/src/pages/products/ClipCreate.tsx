import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function ClipCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("A dynamic 15-second sequence showcasing innovation in action. Opening with a rapid montage of technological breakthroughs, transitioning smoothly to human interactions, and concluding with a powerful statement about the future...");
    } catch (error) {
      console.error('Error generating clip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Clip"
      description="Create short, impactful video segments that tell your story"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Clip
              </h2>
              <p className="text-gray-600">
                Share the story you want to tell in your short video clip. Include pacing, transitions, and key moments.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to create a clip about..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Clip</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-800 leading-relaxed">{result}</p>
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