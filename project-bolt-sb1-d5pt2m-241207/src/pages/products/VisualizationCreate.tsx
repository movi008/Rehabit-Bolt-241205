import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function VisualizationCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("Close your eyes and imagine yourself standing at the summit of your achievements. The air is crisp and clear, filling your lungs with energy and possibility. Below you stretches the path you've climbed, each step a testament to your growth and determination.");
    } catch (error) {
      console.error('Error generating visualization:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Visualization"
      description="Generate vivid mental imagery to manifest your goals"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Vision
              </h2>
              <p className="text-gray-600">
                Share what you want to visualize in detail. Include sensory experiences and emotions.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to visualize..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Visualization</h3>
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