import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { VideoPlayer } from '../../components/VideoPlayer';

export function SessionCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("A transformative 45-minute coaching session focused on personal growth and leadership development. The session includes guided reflection, interactive exercises, and actionable takeaways...");
    } catch (error) {
      console.error('Error generating session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Session"
      description="Design interactive coaching sessions that transform and inspire"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Describe Your Session
              </h2>
              <p className="text-gray-600">
                Share the coaching experience you want to create. Include goals, structure, and desired outcomes.
              </p>
            </div>

            <SimpleInput
              placeholder="I want to create a session that..."
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              minRows={4}
            />

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Session</h3>
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