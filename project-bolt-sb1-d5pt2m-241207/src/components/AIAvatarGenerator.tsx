import React, { useState } from 'react';
import { Loader2, RefreshCw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { aiService } from '../lib/ai';
import { generateAvatarPrompt } from '../lib/prompts';
import { UserProfile } from '../types';

interface AIAvatarGeneratorProps {
  onClose: () => void;
}

const sampleProfile: UserProfile = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'male',
  hairColor: 'brown',
  eyeColor: 'blue',
  preferredClothing: 'business casual',
  mood: 'confident'
};

export function AIAvatarGenerator({ onClose }: AIAvatarGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [avatarStyle, setAvatarStyle] = useState<'professional' | 'creative'>('professional');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const prompt = generateAvatarPrompt(sampleProfile, avatarStyle);
      const result = await aiService.generateImages(prompt, 1);
      
      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.images?.[0]) {
        throw new Error('No image was generated');
      }

      setGeneratedAvatar(result.images[0]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate avatar';
      setError(errorMessage);
      console.error('Avatar generation error:', errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
        {generatedAvatar ? (
          <img
            src={generatedAvatar}
            alt="AI Generated Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isGenerating ? (
              <Loader2 className="w-8 h-8 text-[#007dff] animate-spin" />
            ) : (
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-500">AI Avatar</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="absolute -bottom-24 left-0 right-0 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div className="absolute -bottom-2 right-0 flex space-x-2">
        {generatedAvatar ? (
          <>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-[#007dff] text-white rounded-full shadow-lg hover:bg-[#0066cc]"
            >
              <Check className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setAvatarStyle('professional')}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  avatarStyle === 'professional'
                    ? 'bg-[#007dff] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Professional
              </button>
              <button
                onClick={() => setAvatarStyle('creative')}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  avatarStyle === 'creative'
                    ? 'bg-[#007dff] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Creative
              </button>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#007dff] text-white rounded-full shadow-lg hover:bg-[#0066cc] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}