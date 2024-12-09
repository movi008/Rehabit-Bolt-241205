import React, { useState } from 'react';
import { 
  Code, 
  Terminal, 
  Settings, 
  Database, 
  Cpu, 
  Zap,
  Shield,
  Eye,
  Bot,
  Sparkles,
  AlertTriangle,
  Info,
  Lock,
  Unlock,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModeOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  warning?: string;
}

export function Developer() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<string>('standard');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMode, setConfirmMode] = useState<string | null>(null);

  const modes: ModeOption[] = [
    {
      id: 'demo',
      name: 'Demo Mode',
      description: 'Limited functionality for demonstration purposes',
      icon: Eye,
      features: [
        'Mock data and responses',
        'Disabled API calls',
        'Limited feature set',
        'No persistence'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Mode',
      description: 'Normal application functionality',
      icon: Bot,
      features: [
        'Live API calls',
        'Standard feature set',
        'Normal performance',
        'Regular logging'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Mode',
      description: 'Enhanced development features and debugging',
      icon: Terminal,
      features: [
        'Detailed logging',
        'Performance metrics',
        'Debug information',
        'API response inspection'
      ],
      warning: 'May impact application performance'
    },
    {
      id: 'godmode',
      name: 'God Mode',
      description: 'Full system access and control',
      icon: Zap,
      features: [
        'Unrestricted access',
        'System modifications',
        'Override safeguards',
        'Direct database access'
      ],
      warning: 'Can cause system instability'
    }
  ];

  const handleModeChange = (modeId: string) => {
    if (modeId === 'godmode' || modeId === 'advanced') {
      setConfirmMode(modeId);
      setShowConfirm(true);
    } else {
      setActiveMode(modeId);
    }
  };

  const confirmModeChange = () => {
    if (confirmMode) {
      setActiveMode(confirmMode);
      setShowConfirm(false);
      setConfirmMode(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Developer Settings</h1>
              <p className="mt-2 text-gray-600">Configure advanced system settings and modes</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modes.map((mode) => (
                  <div
                    key={mode.id}
                    className={`relative p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      activeMode === mode.id
                        ? 'border-[#007dff] bg-[#007dff]/5'
                        : 'border-gray-200 hover:border-[#007dff]'
                    }`}
                    onClick={() => handleModeChange(mode.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activeMode === mode.id ? 'bg-[#007dff] text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <mode.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{mode.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
                        <ul className="mt-3 space-y-1">
                          {mode.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {mode.warning && (
                          <div className="mt-3 flex items-start space-x-2 text-amber-600">
                            <AlertTriangle className="w-4 h-4 mt-0.5" />
                            <span className="text-sm">{mode.warning}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Tools */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Developer Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 rounded-lg border border-gray-200 hover:border-[#007dff] hover:bg-[#007dff]/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Terminal className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">Console</h3>
                      <p className="text-sm text-gray-500">Access system console</p>
                    </div>
                  </div>
                </button>
                <button className="p-4 rounded-lg border border-gray-200 hover:border-[#007dff] hover:bg-[#007dff]/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">Database</h3>
                      <p className="text-sm text-gray-500">Manage database</p>
                    </div>
                  </div>
                </button>
                <button className="p-4 rounded-lg border border-gray-200 hover:border-[#007dff] hover:bg-[#007dff]/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Cpu className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">Performance</h3>
                      <p className="text-sm text-gray-500">Monitor system metrics</p>
                    </div>
                  </div>
                </button>
                <button className="p-4 rounded-lg border border-gray-200 hover:border-[#007dff] hover:bg-[#007dff]/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">Security</h3>
                      <p className="text-sm text-gray-500">Security settings</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">System Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Info className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Version</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">1.0.0</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">API Status</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">AI Models</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Enable {modes.find(m => m.id === confirmMode)?.name}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              This mode provides advanced system access and may affect stability. Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmMode(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={confirmModeChange}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Enable Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}