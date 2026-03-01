interface AdPlaceholderProps {
  type?: 'banner' | 'square';
}

export default function AdPlaceholder({ type = 'banner' }: AdPlaceholderProps) {
  const isSquare = type === 'square';

  return (
    <div className="card p-4">
      <div className={`bg-[#1A1A2E] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[#2A2A3E] ${
        isSquare ? 'w-full h-48' : 'w-full h-32'
      }`}>
        <p className="text-[#A0A0B0] mb-1 font-medium">Advertisement</p>
        <p className="text-sm text-[#A0A0B0]/60">
          {isSquare ? '300x250' : '728x90 or 320x50'}
        </p>
        <p className="text-xs text-[#A0A0B0]/40 mt-2">
          Configure AdSense in .env
        </p>
      </div>
    </div>
  );
}
