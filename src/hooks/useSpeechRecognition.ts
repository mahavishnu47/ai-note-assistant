import { useState, useCallback } from 'react';
import { SpeechRecognitionService } from '../utils/speechRecognition';

const speechService = new SpeechRecognitionService();

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(() => {
    setError(null);
    setTranscript(''); // Reset transcript when starting new recording
    speechService.start(
      (text) => {
        setTranscript(text); // Update transcript for both interim and final results
      },
      (error) => setError(error)
    );
  }, []);

  const stopRecording = useCallback(() => {
    speechService.stop();
  }, []);

  return {
    transcript,
    error,
    startRecording,
    stopRecording,
  };
};