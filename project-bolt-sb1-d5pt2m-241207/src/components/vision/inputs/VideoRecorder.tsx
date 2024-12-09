import React, { useState, useRef, useEffect } from 'react';
import { Camera, Square, VideoOff, AlertCircle } from 'lucide-react';

interface VideoRecorderProps {
  onVideoRecorded: (file: File, previewUrl: string) => void;
  onCancel: () => void;
}

export function VideoRecorder({ onVideoRecorded, onCancel }: VideoRecorderProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    requestCameraPermission();
    return () => {
      stopVideoStream();
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      setStream(mediaStream);
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = mediaStream;
      }
      setPermissionError(null);
    } catch (err) {
      if (err instanceof Error) {
        if ((err as any).name === 'NotAllowedError') {
          setPermissionError('Camera access denied. Please allow camera access in your browser settings.');
        } else {
          setPermissionError('Unable to access camera. Please make sure your camera is connected and not in use by another application.');
        }
      }
    }
  };

  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const file = new File([blob], 'recorded-video.webm', { type: 'video/webm' });
      onVideoRecorded(file, url);
      setRecordedChunks([]);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    stopVideoStream();
  };

  if (permissionError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Camera Access Required</h3>
            <p className="mt-1 text-sm text-red-700">{permissionError}</p>
            <div className="mt-3 flex space-x-4">
              <button
                onClick={requestCameraPermission}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try Again
              </button>
              <button
                onClick={onCancel}
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <video
        ref={videoPreviewRef}
        autoPlay
        muted
        playsInline
        className="w-full aspect-video bg-black rounded-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>Start Recording</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2 animate-pulse"
          >
            <Square className="w-5 h-5" />
            <span>Stop Recording</span>
          </button>
        )}
        <button
          onClick={() => {
            stopVideoStream();
            onCancel();
          }}
          className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <VideoOff className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}