import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  Users2, 
  HeartHandshake,
  Star,
  Award,
  Crown,
  Eye,
  UserCircle,
  X,
  Check,
  Search
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'pending';
  lastActive?: string;
}

interface TeamSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  members: TeamMember[];
}

export function Teams() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const teamSections: TeamSection[] = [
    {
      id: 'accountability',
      title: 'A Team - Accountability Team',
      description: 'Your Accountability Team is anybody in the Community who is both agreed and enrolled into being a Team Member and fits a certain role in the Community, and invited and accepted by yourself as that role in your Team.',
      icon: Shield,
      members: [
        {
          id: '1',
          name: 'Sarah Johnson',
          role: 'Master',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150',
          status: 'active',
          lastActive: '2 hours ago'
        },
        {
          id: '2',
          name: 'Michael Chen',
          role: 'Expert',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150',
          status: 'active',
          lastActive: '1 day ago'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          role: 'Leader',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150',
          status: 'pending'
        }
      ]
    },
    {
      id: 'buddy',
      title: 'B Team - Buddy Team',
      description: 'Your Buddy Team consists of peers who support and motivate each other in achieving personal and professional goals.',
      icon: HeartHandshake,
      members: [
        {
          id: '4',
          name: 'David Park',
          role: 'Buddy',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150',
          status: 'active',
          lastActive: '3 hours ago'
        },
        {
          id: '5',
          name: 'Lisa Thompson',
          role: 'Buddy',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150',
          status: 'active',
          lastActive: '5 hours ago'
        }
      ]
    },
    {
      id: 'contributors',
      title: 'C Team - Contributors Team',
      description: 'Your Contributors Team includes community members who actively participate in and contribute to various projects and initiatives.',
      icon: Users2,
      members: [
        {
          id: '6',
          name: 'Alex Rivera',
          role: 'Contributor',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150',
          status: 'active',
          lastActive: '1 hour ago'
        }
      ]
    }
  ];

  const handleInvite = (teamId: string) => {
    setSelectedTeam(teamId);
    setShowInviteModal(true);
  };

  const sendInvite = () => {
    if (!inviteEmail.trim() || !selectedTeam) return;
    
    // Here you would typically make an API call to send the invite
    console.log(`Sending invite to ${inviteEmail} for team ${selectedTeam}`);
    
    setInviteEmail('');
    setShowInviteModal(false);
    setSelectedTeam(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'master':
        return Crown;
      case 'expert':
        return Star;
      case 'leader':
        return Award;
      case 'hidden':
        return Eye;
      default:
        return UserCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <p className="mt-2 text-gray-600">Manage your accountability, buddy, and contributor teams</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
            />
          </div>
        </div>

        {/* Team Sections */}
        <div className="space-y-8">
          {teamSections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#007dff]/10 rounded-lg">
                      <section.icon className="w-6 h-6 text-[#007dff]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                      <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInvite(section.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Invite Member</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.members.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-[#007dff] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {member.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {React.createElement(getRoleIcon(member.role), {
                              className: 'w-4 h-4 text-gray-400'
                            })}
                            <span className="text-sm text-gray-500">{member.role}</span>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                      </div>
                      {member.lastActive && (
                        <p className="mt-2 text-xs text-gray-500">
                          Active {member.lastActive}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
                  <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900">
                      Team members will receive an email invitation to join your team
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      They must accept the invitation to be added to the team
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
                onClick={sendInvite}
                className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}