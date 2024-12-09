import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    if (playerRef.current) {
      playerRef.current.seekTo(percent * duration);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      <div className="aspect-video bg-gray-800 relative">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          className="absolute top-0 left-0"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => playerRef.current?.seekTo(Math.max(0, progress - 10))}
            >
              <SkipBack className="w-6 h-6 text-white" />
            </button>
            <button 
              className="p-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-colors"
              onClick={handlePlayPause}
            >
              {playing ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white fill-current" />
              )}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => playerRef.current?.seekTo(Math.min(duration, progress + 10))}
            >
              <SkipForward className="w-6 h-6 text-white" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>
        <div 
          className="relative h-1 bg-gray-700 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="absolute h-full bg-indigo-500 rounded-full transition-all duration-100"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}