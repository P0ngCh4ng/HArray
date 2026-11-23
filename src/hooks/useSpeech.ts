import { useCallback, useEffect, useRef, useState } from 'react';

const RATE_KEY = 'korean-vocab-speech-rate';

export const SPEECH_RATES = [
  { label: 'ゆっくり', value: 0.6 },
  { label: 'ふつう', value: 0.85 },
  { label: '自然', value: 1 },
] as const;

const DEFAULT_RATE = 0.85;

export function getSpeechRate(): number {
  try {
    const n = Number(localStorage.getItem(RATE_KEY));
    return SPEECH_RATES.some(r => r.value === n) ? n : DEFAULT_RATE;
  } catch {
    return DEFAULT_RATE;
  }
}

export function setSpeechRate(rate: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(rate));
  } catch {
    // localStorage が使えなくても読み上げ自体は動くので無視する
  }
}

// 端末に入っている韓国語の声の中から、一番質の良いものを選ぶ。
// lang = 'ko-KR' だけ指定してブラウザに任せると、同じ ko-KR でも
// 機械的に聞こえる声が選ばれることが多い。
function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  let score = 0;
  // Apple の高品質版（iOS/macOS の設定から追加ダウンロードするもの）
  if (/enhanced|premium|neural|natural/.test(name)) score += 100;
  // Google・Microsoft のクラウド音声は概ね自然
  if (/google/.test(name)) score += 60;
  if (!v.localService) score += 30;
  // 各OSに標準で入っている韓国語音声
  if (/yuna|유나|heami|sunhi|injoon|nari/.test(name)) score += 20;
  if (v.default) score += 5;
  return score;
}

function pickKoreanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const korean = voices.filter(v =>
    v.lang?.toLowerCase().replace('_', '-').startsWith('ko')
  );
  if (korean.length === 0) return null;
  return [...korean].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

// getVoices() は Chrome では初回に空配列を返し voiceschanged を待つ必要があるが、
// Safari ではそのイベントが飛ばないことがあるため、ポーリングも併用する。
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesPromise) return voicesPromise;
  voicesPromise = new Promise(resolve => {
    const synth = window.speechSynthesis;
    const ready = synth.getVoices();
    if (ready.length > 0) {
      resolve(ready);
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener('voiceschanged', finish);
      clearInterval(poll);
      clearTimeout(bail);
      resolve(synth.getVoices());
    };
    synth.addEventListener('voiceschanged', finish);
    const poll = setInterval(() => {
      if (synth.getVoices().length > 0) finish();
    }, 100);
    const bail = setTimeout(finish, 3000);
  });
  return voicesPromise;
}

// 例文は [[対象語]] の形で持っているため、記号をそのまま読み上げないよう外す。
function clean(text: string): string {
  return text.replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim();
}

export function useSpeech() {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceChecked, setVoiceChecked] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!isSupported) {
      setVoiceChecked(true);
      return;
    }
    let alive = true;
    loadVoices().then(list => {
      if (!alive) return;
      const picked = pickKoreanVoice(list);
      voiceRef.current = picked;
      setVoice(picked);
      setVoiceChecked(true);
    });
    return () => { alive = false; };
  }, [isSupported]);

  const speak = useCallback((text: string, opts: { rate?: number } = {}) => {
    if (!isSupported) return;
    const body = clean(text);
    if (!body) return;

    const synth = window.speechSynthesis;
    // 連打したときに前の発話が残らないようにする。speak() と同じタイミングで
    // cancel() すると発話が鳴らない環境があるため、鳴っている時だけ止める。
    if (synth.speaking || synth.pending) synth.cancel();
    if (synth.paused) synth.resume();

    const utterance = new SpeechSynthesisUtterance(body);
    utterance.lang = 'ko-KR';
    utterance.rate = opts.rate ?? getSpeechRate();
    utterance.pitch = 1;
    utterance.volume = 1;
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [isSupported]);

  return {
    speak,
    stop,
    isSupported,
    speaking,
    voiceName: voice?.name ?? null,
    // 韓国語の声が入っていない端末では発音が当てにならないので、UI 側で伝える
    hasKoreanVoice: voiceChecked ? voice != null : true,
  };
}
