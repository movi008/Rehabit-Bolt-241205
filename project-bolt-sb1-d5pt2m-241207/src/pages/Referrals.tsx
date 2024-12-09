import React, { useState } from 'react';
import { 
  DollarSign, 
  Copy, 
  Check, 
  Users2,
  Trophy,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

interface ReferralStats {
  clicks: number;
  signups: number;
  sales: number;
  earnings: number;
  pendingEarnings: number;
}

export function Referrals() {
  const [linkCopied, setLinkCopied] = useState(false);
  const referralLink = 'https://rehabit.ai/ref/johndoe123';
  
  const referralStats: ReferralStats = {
    clicks: 1234,
    signups: 56,
    sales: 23,
    earnings: 1250.00,
    pendingEarnings: 350.00
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
          <p className="mt-2 text-gray-600">Share Rehabit with your friends and earn rewards</p>
        </div>

        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600">Total</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">{referralStats.clicks}</p>
              <p className="text-sm text-gray-500">Clicks</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users2 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">Total</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">{referralStats.signups}</p>
              <p className="text-sm text-gray-500">Sign-ups</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-600">Total</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">{referralStats.sales}</p>
              <p className="text-sm text-gray-500">Sales</p>
            </div>
          </div>

          {/* Earnings Module */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Total Earnings</h2>
                  <p className="text-sm text-gray-500">Lifetime earnings from referrals</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${referralStats.earnings}</p>
                <p className="text-sm text-gray-500">${referralStats.pendingEarnings} pending</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Referral Link */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h2>
                <div className="flex space-x-2">
                  <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 truncate">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors flex items-center space-x-2"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Share this link with your friends and earn rewards when they sign up and make purchases.
                </p>
              </div>

              {/* How It Works */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Share2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Share Your Link</h3>
                      <p className="text-sm text-gray-500">Share your unique referral link with friends and followers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Friends Sign Up</h3>
                      <p className="text-sm text-gray-500">When they create an account using your link</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Earn Rewards</h3>
                      <p className="text-sm text-gray-500">Get paid when they make their first purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Leaderboards */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Leaderboard</h2>
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-[#007dff]">#1</span>
                        <span className="text-gray-900">John D.</span>
                      </div>
                      <span className="font-medium">$2,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-gray-500">#2</span>
                        <span className="text-gray-900">Sarah M.</span>
                      </div>
                      <span className="font-medium">$1,890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-yellow-600">#3</span>
                        <span className="text-gray-900">Mike R.</span>
                      </div>
                      <span className="font-medium">$1,550</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Marketing Kit</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Brand Assets</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}