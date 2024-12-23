export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  constructor() {
    if (this.isSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  start(onResult: (text: string) => void, onError: (error: string) => void) {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser');
      return;
    }

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      onResult(finalTranscript || interimTranscript);
    };

    this.recognition.onerror = (event) => {
      onError(event.error);
    };

    this.recognition.start();
  }

  stop() {
    this.recognition?.stop();
  }
}