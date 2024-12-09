import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function AffirmationCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("I am confident and capable of achieving my goals.\nI embrace challenges as opportunities for growth.\nEvery day, I'm becoming a better version of myself.");
    } catch (error) {
      console.error('Error generating affirmation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Affirmation"
      description="Generate powerful positive statements to reinforce your vision"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Desired State
              </h2>
              <p className="text-gray-600">
                Share what you want to affirm about yourself or your future. Be specific and positive.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to affirm..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Affirmations</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  {result.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-800 mb-3">
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