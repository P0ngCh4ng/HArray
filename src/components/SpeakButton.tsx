import { useSpeech } from '../hooks/useSpeech';

interface Props {
  text: string;
  className?: string;
  /** 省略時はホーム画面で選んだ速度を使う */
  rate?: number;
  label?: string;
}

export function SpeakButton({ text, className = '', rate, label = '発音を聞く' }: Props) {
  const { speak, isSupported, speaking } = useSpeech();
  if (!isSupported) return null;
  return (
    <button
      onClick={e => { e.stopPropagation(); speak(text, { rate }); }}
      className={`p-2 rounded-full text-indigo-500 active:scale-95 transition-all shrink-0 ${
        speaking ? 'bg-indigo-200' : 'bg-indigo-50 hover:bg-indigo-100'
      } ${className}`}
      aria-label={label}
      title={label}
    >
      🔊
    </button>
  );
}
