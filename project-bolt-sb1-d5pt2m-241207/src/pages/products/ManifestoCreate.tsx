import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function ManifestoCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("We believe in the power of technology to transform lives. Our mission is to create tools that empower individuals to achieve their full potential...");
    } catch (error) {
      console.error('Error generating manifesto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Manifesto"
      description="Write your declaration of purpose and principles"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Manifesto
              </h2>
              <p className="text-gray-600">
                Share the core beliefs, values, and vision you want to express in your manifesto.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to create a manifesto about..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Manifesto</h3>
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