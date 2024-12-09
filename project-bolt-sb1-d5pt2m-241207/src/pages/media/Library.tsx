import React from 'react';
import { MediaLibrary } from '../../components/media/MediaLibrary';

export function Library() {
  return (
    <MediaLibrary
      type="all"
      title="Media Library"
      description="Browse and manage all your media assets in one place"
    />
  );
}