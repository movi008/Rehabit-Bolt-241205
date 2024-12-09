import React, { useState } from 'react';
import { CreditCard, Clock, Download, AlertCircle, ChevronRight, Shield, Hexagon, Star, Circle } from 'lucide-react';

export function Subscription() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = {
    name: 'Plus',
    price: 7,
    billingCycle: 'monthly',
    nextBilling: '2024-04-10',
    cardLast4: '4242'
  };

  const billingHistory = [
    { date: '2024-03-10', amount: 7.00, status: 'paid', invoice: '#INV-2024-001' },
    { date: '2024-02-10', amount: 7.00, status: 'paid', invoice: '#INV-2024-002' },
    { date: '2024-01-10', amount: 7.00, status: 'paid', invoice: '#INV-2024-003' }
  ];

  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: Hexagon,
      features: ['1 Vision Project', '1 Persona', '1 Avatar']
    },
    {
      name: 'Plus',
      price: 7,
      icon: Star,
      features: ['3 Vision Projects', '3 Personas', '3 Avatars'],
      current: true
    },
    {
      name: 'Prime',
      price: billingCycle === 'monthly' ? 27 : 1,
      icon: Circle,
      features: ['5 Vision Projects', '5 Personas', '5 Avatars']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
          <p className="mt-2 text-gray-600">Manage your subscription and billing details.</p>
        </div>

        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                <button
                  onClick={() => setShowUpgrade(!showUpgrade)}
                  className="text-[#007dff] hover:text-[#0066cc] text-sm font-medium"
                >
                  {showUpgrade ? 'Hide Plans' : 'View All Plans'}
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#007dff] rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentPlan.name} Plan</h3>
                    <p className="text-sm text-gray-500">
                      ${currentPlan.price}/month • Next billing {currentPlan.nextBilling}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-[#007dff] hover:bg-[#007dff]/5 rounded-lg transition-colors">
                  Cancel Plan
                </button>
              </div>

              {showUpgrade && (
                <div className="mt-6">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                      <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          billingCycle === 'monthly' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          billingCycle === 'yearly' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.name}
                        className={`p-4 rounded-lg border ${
                          plan.current 
                            ? 'border-[#007dff] bg-[#007dff]/5' 
                            : 'border-gray-200 hover:border-[#007dff] transition-colors'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <plan.icon className={`w-5 h-5 ${plan.current ? 'text-[#007dff]' : 'text-gray-400'}`} />
                          <h3 className="font-semibold">{plan.name}</h3>
                        </div>
                        <div className="mb-4">
                          <span className="text-2xl font-bold">${plan.price}</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <ChevronRight className="w-4 h-4 text-[#007dff]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {!plan.current && (
                          <button className="w-full py-2 px-4 rounded-lg border border-[#007dff] text-[#007dff] hover:bg-[#007dff] hover:text-white transition-colors">
                            {plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                          </button>
                        )}
                        {plan.current && (
                          <div className="w-full py-2 px-4 rounded-lg bg-[#007dff]/10 text-[#007dff] text-center">
                            Current Plan
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Visa ending in {currentPlan.cardLast4}</p>
                    <p className="text-sm text-gray-500">Expires 12/2024</p>
                  </div>
                </div>
                <button className="text-[#007dff] hover:text-[#0066cc]">
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((bill, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 px-4 text-sm text-gray-900">{bill.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">${bill.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {bill.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-[#007dff] hover:text-[#0066cc] text-sm font-medium inline-flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {bill.invoice}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-[#007dff]/5 rounded-xl p-4 flex items-start space-x-4">
            <Shield className="w-6 h-6 text-[#007dff] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Secure Payment Processing</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your payment information is encrypted and securely processed. We never store your full card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}