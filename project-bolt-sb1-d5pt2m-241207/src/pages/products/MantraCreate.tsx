import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function MantraCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("Om Shanti Shanti Shanti\nI am peace, I am light, I am love\nAll is well in my world");
    } catch (error) {
      console.error('Error generating mantra:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Mantra"
      description="Craft your personal power phrases for meditation and focus"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Intention
              </h2>
              <p className="text-gray-600">
                Share the core feeling or state you want to embody through your mantra.
              </p>
            </div>

            <SimpleInput
              placeholder="I seek to embody..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Mantra</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  {result.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-800 mb-3 text-center text-xl">
                      {line}
                    </p>
                  ))}
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