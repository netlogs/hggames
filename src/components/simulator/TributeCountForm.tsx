interface TributeCountFormProps {
  tributeCount: number;
  onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  isGenerateEnabled: boolean;
}

export default function TributeCountForm({
  tributeCount,
  onCountChange,
  onGenerate,
  isGenerateEnabled
}: TributeCountFormProps) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-4">
          How Many Tributes?
        </h2>
        <p className="text-white/70 mb-6">
          Enter the number of tributes (2-24)
        </p>
        <p className="animate-gradient-text mb-6">
        A huge update is coming soon, with a brand new page experience, abundant content, and more complete gameplay! edit in 2024-12-10
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          min="2"
          max="24"
          value={tributeCount || ''}
          onChange={onCountChange}
          onBlur={onCountChange}
          className="bg-secondary-light border border-primary/30 rounded-lg px-4 py-2 w-32 text-center text-xl focus:outline-none focus:border-primary"
        />
        
        <button
          onClick={onGenerate}
          disabled={!isGenerateEnabled}
          className={`bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors
            ${!isGenerateEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Generate Tribute Forms ({tributeCount} tributes)
        </button>
      </div>
    </div>
  );
} 