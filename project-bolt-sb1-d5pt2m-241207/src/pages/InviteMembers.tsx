import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  Info,
  CreditCard
} from 'lucide-react';

interface Member {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'active';
  role: 'member' | 'admin';
  joinedDate?: string;
}

interface PricingTier {
  name: string;
  price: number;
  features: string[];
}

export function InviteMembers() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      email: 'sarah@example.com',
      name: 'Sarah Johnson',
      status: 'active',
      role: 'admin',
      joinedDate: '2024-02-15'
    },
    {
      id: '2',
      email: 'mike@example.com',
      name: 'Mike Wilson',
      status: 'pending',
      role: 'member'
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showPricingInfo, setShowPricingInfo] = useState(false);

  const currentPlan: PricingTier = {
    name: 'Plus',
    price: 7,
    features: [
      'All core features',
      'Priority support',
      'Advanced analytics'
    ]
  };

  const handleInvite = () => {
    if (!inviteEmail) return;

    const newMember: Member = {
      id: Date.now().toString(),
      email: inviteEmail,
      name: '',
      status: 'pending',
      role: 'member'
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-2 text-gray-600">Manage your team members and their access</p>
        </div>

        {/* Current Plan Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current Plan: {currentPlan.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  ${currentPlan.price}/month per member
                </p>
              </div>
              <button
                onClick={() => setShowPricingInfo(true)}
                className="text-[#007dff] hover:text-[#0066cc] flex items-center space-x-1"
              >
                <Info className="w-5 h-5" />
                <span>Pricing Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Invite Member</span>
              </button>
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#007dff] flex items-center justify-center text-white font-semibold">
                      {member.name ? member.name[0].toUpperCase() : member.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {member.name || member.email}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{member.email}</span>
                        {member.status === 'pending' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
                      value={member.role}
                      onChange={(e) => {
                        const newMembers = members.map(m =>
                          m.id === member.id ? { ...m, role: e.target.value as 'member' | 'admin' } : m
                        );
                        setMembers(newMembers);
                      }}
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    placeholder="colleague@example.com"
                  />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900">
                      Adding this member will increase your monthly bill by ${currentPlan.price}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Billed at the end of the current billing cycle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Info Modal */}
      {showPricingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-[#007dff]" />
                <h3 className="text-lg font-semibold text-gray-900">Team Pricing</h3>
              </div>
              <button
                onClick={() => setShowPricingInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">
                  ${currentPlan.price}/month per member
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Each team member is billed at the same rate as your current plan
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Included for each member:</h4>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-900">
                      Changes to team size will be reflected in your next bill
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Pro-rated charges may apply for mid-cycle changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPricingInfo(false)}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}