import React, { useState } from 'react';
import { ProductLayout } from '../../components/products/ProductLayout';
import { SimpleInput } from '../../components/products/SimpleInput';
import { AIAvatarGenerator } from '../../components/AIAvatarGenerator';

export function AvatarCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const handleSubmit = async (text: string) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowAIGenerator(true);
    } catch (error) {
      console.error('Error generating avatar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductLayout
      title="Create Avatar"
      description="Design your digital representation with AI assistance"
    >
      <div className="space-y-8">
        {!showAIGenerator ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Describe Your Avatar
                </h2>
                <p className="text-gray-600">
                  Describe how you want your avatar to look. Include details about style, mood, and appearance.
                </p>
              </div>

              <SimpleInput
                placeholder="I want my avatar to look..."
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                minRows={4}
              />
            </div>
          </div>
        ) : (
          <AIAvatarGenerator onClose={() => setShowAIGenerator(false)} />
        )}
      </div>
    </ProductLayout>
  );
}