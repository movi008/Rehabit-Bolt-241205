import React from 'react';
import { Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HelpFooter } from '../../components/help/HelpFooter';

export function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/help')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="mt-2 text-gray-600">Last updated: March 2024</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h2>Introduction</h2>
                <p>
                  At Rehabit, we take your privacy seriously. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our service.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us when you:
                </p>
                <ul>
                  <li>Create an account</li>
                  <li>Use our meditation and mindfulness features</li>
                  <li>Communicate with us</li>
                  <li>Participate in our community</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide and maintain our service</li>
                  <li>Personalize your experience</li>
                  <li>Improve our features</li>
                  <li>Communicate with you</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to maintain the security
                  of your personal information.
                </p>

                <h2>Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:privacy@rehabit.ai" className="text-[#007dff] hover:text-[#0066cc]">
                    privacy@rehabit.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HelpFooter />
    </div>
  );
}