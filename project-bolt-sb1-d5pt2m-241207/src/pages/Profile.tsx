import React, { useState } from 'react';
import { Camera, Upload, Loader2, Sparkles } from 'lucide-react';
import { ProfileForm } from '../components/ProfileForm';
import { AvatarUpload } from '../components/AvatarUpload';
import { AIAvatarGenerator } from '../components/AIAvatarGenerator';

export function Profile() {
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="max-w-2xl">
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
                <div className="flex items-start space-x-6">
                  {!showAIGenerator ? (
                    <AvatarUpload />
                  ) : (
                    <AIAvatarGenerator onClose={() => setShowAIGenerator(false)} />
                  )}
                  <div className="flex-1 space-y-4">
                    <button
                      onClick={() => setShowAIGenerator(!showAIGenerator)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-[#007dff] text-[#007dff] rounded-lg hover:bg-[#007dff] hover:text-white transition-colors"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>{showAIGenerator ? 'Cancel AI Generation' : 'Generate AI Avatar'}</span>
                    </button>
                    <p className="text-sm text-gray-500">
                      Generate a unique avatar using AI, or upload your own photo.
                      Recommended size: 400x400px.
                    </p>
                  </div>
                </div>
              </div>

              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}