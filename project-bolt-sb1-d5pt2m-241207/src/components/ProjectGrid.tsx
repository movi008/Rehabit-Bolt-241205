import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, MoreVertical } from 'lucide-react';
import { Project } from '../types';
import { ProjectMenu } from './ProjectMenu';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onMenuClick: (e: React.MouseEvent, project: Project) => void;
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const navigate = useNavigate();
  const [menuProject, setMenuProject] = useState<Project | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setMenuProject(project);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-video">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => handleProjectClick(project)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="font-semibold text-gray-900 hover:text-[#007dff] text-left"
                  >
                    {project.title}
                  </button>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleMenuClick(e, project)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectMenu
        project={menuProject!}
        isOpen={!!menuProject}
        onClose={() => setMenuProject(null)}
        position={menuPosition}
      />
    </>
  );
}