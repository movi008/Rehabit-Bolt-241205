import React from 'react';
import { MediaLibrary } from '../../components/media/MediaLibrary';

export function Audio() {
  return (
    <MediaLibrary
      type="audio"
      title="Audio"
      description="Manage your audio files and AI-generated voiceovers"
    />
  );
}