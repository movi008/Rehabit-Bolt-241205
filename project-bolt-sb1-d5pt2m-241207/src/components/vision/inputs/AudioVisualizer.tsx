import React, { useRef, useEffect, useState } from 'react';
import { AlertCircle, Mic } from 'lucide-react';
import { AudioContextManager } from '../../../lib/audio/context';
import { AudioVisualizer as Visualizer } from '../../../lib/audio/visualizer';

interface AudioVisualizerProps {
  isRecording: boolean;
  onError?: (error: string) => void;
}

export function AudioVisualizer({ isRecording, onError }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioManagerRef = useRef<AudioContextManager | null>(null);
  const visualizerRef = useRef<Visualizer | null>(null);
  const animationFrameRef = useRef<number>();
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRecording) {
      cleanup();
      return;
    }

    const startVisualization = async () => {
      try {
        if (!canvasRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        audioManagerRef.current = new AudioContextManager();
        const { analyser, dataArray } = await audioManagerRef.current.initialize();

        visualizerRef.current = new Visualizer({
          ctx,
          width: canvasRef.current.width,
          height: canvasRef.current.height,
          analyser,
          dataArray
        });

        setPermissionError(null);
        animate();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error accessing microphone';
        setPermissionError(message);
        onError?.(message);
        cleanup();
      }
    };

    startVisualization();
    return cleanup;
  }, [isRecording, onError]);

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    audioManagerRef.current?.cleanup();
    audioManagerRef.current = null;
    visualizerRef.current = null;
  };

  const animate = () => {
    if (!visualizerRef.current) return;
    visualizerRef.current.draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  if (permissionError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-red-700 text-center mb-4">{permissionError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Mic className="w-5 h-5" />
          <span>Retry Microphone Access</span>
        </button>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="mx-auto bg-transparent"
    />
  );
}