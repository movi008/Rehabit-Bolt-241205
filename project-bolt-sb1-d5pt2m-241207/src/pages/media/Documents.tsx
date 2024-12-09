import React from 'react';
import { MediaLibrary } from '../../components/media/MediaLibrary';

export function Documents() {
  return (
    <MediaLibrary
      type="document"
      title="Documents"
      description="Manage your documents and written content"
    />
  );
}