import React from 'react';
import { MediaLibrary } from '../../components/media/MediaLibrary';

export function Videos() {
  return (
    <MediaLibrary
      type="video"
      title="Videos"
      description="Manage your video content and AI-generated animations"
    />
  );
}