import { useCallback } from 'react';

export function useSpeech() {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  return { speak, isSupported };
}
