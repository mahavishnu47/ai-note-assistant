import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const VoiceInput = () => {
  const { isRecording, setIsRecording } = useStore();
  const { transcript, error, startRecording, stopRecording } = useSpeechRecognition();

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      {transcript && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow-lg max-w-md w-80">
          <p className="text-sm text-gray-700">{transcript}</p>
        </div>
      )}
      <button
        onClick={toggleRecording}
        className={`p-4 rounded-full shadow-lg transition-colors ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isRecording ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
};