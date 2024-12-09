import React from 'react';
import { FileText, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HelpFooter } from '../../components/help/HelpFooter';

export function Terms() {
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
                <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
                <p className="mt-2 text-gray-600">Last updated: March 2024</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing or using Rehabit, you agree to be bound by these Terms and Conditions
                  and our Privacy Policy.
                </p>

                <h2>Use License</h2>
                <p>
                  We grant you a limited, non-exclusive, non-transferable, revocable license to use
                  our service for personal, non-commercial purposes.
                </p>

                <h2>User Accounts</h2>
                <p>
                  When you create an account with us, you must provide accurate and complete information.
                  You are responsible for maintaining the security of your account.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality are owned by
                  Rehabit and are protected by international copyright, trademark, and other laws.
                </p>

                <h2>User Content</h2>
                <p>
                  By posting content on Rehabit, you grant us the right to use, modify, publicly
                  perform, publicly display, reproduce, and distribute such content.
                </p>

                <h2>Prohibited Uses</h2>
                <p>
                  You agree not to use the service:
                </p>
                <ul>
                  <li>For any unlawful purpose</li>
                  <li>To harass, abuse, or harm others</li>
                  <li>To impersonate or attempt to impersonate others</li>
                  <li>To engage in any activity that interferes with the service</li>
                </ul>

                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the service immediately,
                  without prior notice or liability, for any reason.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these terms at any time. We will provide
                  notice of any changes by posting the new Terms on this page.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                  <br />
                  <a href="mailto:legal@rehabit.ai" className="text-[#007dff] hover:text-[#0066cc]">
                    legal@rehabit.ai
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