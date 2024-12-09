import React from 'react';
import { MediaLibrary } from '../../components/media/MediaLibrary';

export function Images() {
  return (
    <MediaLibrary
      type="image"
      title="Images"
      description="Manage your image assets and AI-generated visuals"
    />
  );
}