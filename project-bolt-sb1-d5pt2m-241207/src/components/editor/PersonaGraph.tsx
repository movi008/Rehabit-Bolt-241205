import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DataGroup {
  title: string;
  data: Record<string, any>;
}

export function PersonaGraph() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Sample data structure - in a real app, this would come from your state/API
  const dataGroups: DataGroup[] = [
    {
      title: 'Basic Information',
      data: {
        id: 'vision-123',
        title: 'Professional Growth Vision 2024',
        createdAt: '2024-03-15T10:30:00Z',
        lastModified: '2024-03-16T15:45:00Z',
        status: 'active',
        version: '1.2.0'
      }
    },
    {
      title: 'Temporal Data',
      data: {
        timeSpace: ['Present', 'Future'],
        timeZone: ['5-10 years'],
        timeline: {
          start: '2024',
          peak: '2029',
          horizon: '2034'
        },
        milestones: [
          { year: 2025, event: 'Career Transition' },
          { year: 2027, event: 'Leadership Role' },
          { year: 2030, event: 'Industry Recognition' }
        ]
      }
    },
    {
      title: 'Dimensional Data',
      data: {
        realm: ['Professional', 'Personal', 'Social'],
        world: ['Self', 'Team', 'Organization', 'Industry'],
        scope: {
          primary: 'Career Development',
          secondary: ['Leadership', 'Innovation'],
          tertiary: ['Technical Skills', 'Soft Skills']
        }
      }
    },
    {
      title: 'Energetic Data',
      data: {
        chakra: 'Solar Plexus',
        emotions: ['Confidence', 'Determination', 'Enthusiasm'],
        intensity: 85,
        frequency: 'High',
        resonance: ['Achievement', 'Growth', 'Impact']
      }
    },
    {
      title: 'Personality Traits',
      data: {
        core: {
          openness: 85,
          conscientiousness: 90,
          extraversion: 75,
          agreeableness: 80,
          neuroticism: 30
        },
        professional: {
          leadership: 85,
          innovation: 88,
          teamwork: 82,
          communication: 87,
          problemSolving: 90
        },
        personal: {
          resilience: 85,
          adaptability: 88,
          empathy: 82,
          integrity: 95,
          growth_mindset: 92
        }
      }
    },
    {
      title: 'Vision Elements',
      data: {
        goals: [
          'Achieve industry leadership position',
          'Build high-performing teams',
          'Drive technological innovation'
        ],
        values: [
          'Excellence',
          'Innovation',
          'Integrity',
          'Collaboration'
        ],
        skills: {
          technical: ['AI/ML', 'System Architecture', 'Cloud Computing'],
          leadership: ['Strategic Planning', 'Team Building', 'Decision Making'],
          soft: ['Communication', 'Emotional Intelligence', 'Adaptability']
        }
      }
    },
    {
      title: 'Manifestation Metrics',
      data: {
        progress: 65,
        alignment: 88,
        clarity: 92,
        momentum: 78,
        resistance: 25,
        support: 85,
        synchronicity: 72
      }
    },
    {
      title: 'Resource Allocation',
      data: {
        time: {
          daily: '2 hours',
          weekly: '14 hours',
          monthly: '60 hours'
        },
        energy: {
          mental: 85,
          emotional: 78,
          physical: 72,
          spiritual: 80
        },
        focus: {
          primary: 'Career Growth',
          secondary: 'Skill Development',
          tertiary: 'Network Building'
        }
      }
    }
  ];

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderValue = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <div className="pl-4">
          {value.map((item, index) => (
            <div key={index} className="text-gray-800">
              {typeof item === 'object' ? renderValue(item) : `- ${item}`}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mb-2">
              <span className="text-gray-600">{key}: </span>
              {renderValue(val)}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-gray-800">{value}</span>;
  };

  return (
    <div className="space-y-2 font-mono text-sm">
      {dataGroups.map(({ title, data }) => (
        <div key={title} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleGroup(title)}
            className="w-full px-4 py-2 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900">{title}</span>
            {expandedGroups[title] ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {expandedGroups[title] && (
            <div className="p-4 bg-white border-t border-gray-200">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="text-gray-600">{key}: </span>
                  {renderValue(value)}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}