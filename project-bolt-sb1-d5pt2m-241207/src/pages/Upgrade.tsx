import React, { useState } from 'react';
import { Hexagon, Star, Circle } from 'lucide-react';

export function Upgrade() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: Hexagon,
      description: 'For anyone needing clear and inspiring visions of their future.',
      features: [
        '1 Vision Project',
        '1 Persona',
        '1 Avatar',
        '1 Stock Voice',
        '1 Personalized Meditations'
      ],
      buttonText: 'Downgrade',
      buttonStyle: 'text-[#007dff] border-[#007dff] hover:bg-[#007dff] hover:text-white'
    },
    {
      name: 'Plus',
      price: 7,
      icon: Star,
      description: 'For mediators seeking powerful tools for radical life-changes.',
      features: [
        '3 Vision Project',
        '3 Personas',
        '3 Avatars',
        '1 Own Voice Clone',
        '3 Meditations / Vision / Scripts'
      ],
      buttonText: 'Current',
      buttonStyle: 'bg-[#007dff] text-white hover:bg-[#0066cc]',
      highlighted: true
    },
    {
      name: 'Prime',
      price: billingCycle === 'monthly' ? 27 : 1,
      originalPrice: 27,
      icon: Circle,
      description: 'For reality hackers projecting positive change in the world',
      features: [
        '5 Vision Project',
        '5 Personas',
        '5 Avatars',
        '1 Own Voice Clone',
        '5 Personalized Meditations'
      ],
      buttonText: 'Claim Your Offer',
      buttonStyle: 'text-[#007dff] border-[#007dff] hover:bg-[#007dff] hover:text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upgrade</h1>
          <p className="mt-2 text-gray-600">Choose the plan that best fits your needs</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-3xl p-8 relative ${
                plan.highlighted 
                  ? 'ring-2 ring-[#007dff] shadow-lg' 
                  : 'border border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <plan.icon 
                  className={`w-12 h-12 ${
                    plan.highlighted ? 'text-[#007dff]' : 'text-gray-600'
                  }`}
                />
                <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/ month</span>
                </div>
                {plan.originalPrice && (
                  <div className="absolute top-6 right-6">
                    <span className="line-through text-gray-400">${plan.originalPrice}</span>
                  </div>
                )}
                <p className="text-gray-600 mb-8">{plan.description}</p>
                <div className="space-y-4 mb-8 w-full">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-gray-600">
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-xl border transition-colors font-medium ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}