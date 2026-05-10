import { useSpeech } from '../hooks/useSpeech';

interface Props {
  text: string;
  className?: string;
}

export function SpeakButton({ text, className = '' }: Props) {
  const { speak, isSupported } = useSpeech();
  if (!isSupported) return null;
  return (
    <button
      onClick={e => { e.stopPropagation(); speak(text); }}
      className={`p-2 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 active:scale-95 transition-all shrink-0 ${className}`}
      aria-label="発音を聞く"
    >
      🔊
    </button>
  );
}
