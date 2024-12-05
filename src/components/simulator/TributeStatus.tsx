import type { Tribute } from "./tribute";

interface TributeStatusProps {
  tributes: Tribute[];
  onProceed: () => void;
}

export default function TributeStatus({
  tributes,
  onProceed
}: TributeStatusProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-display font-bold mb-4 text-center">
        Tribute Status
      </h2>
      <div className="grid gap-4">
        {tributes.map((tribute, index) => (
          <div key={index} className="flex items-center gap-4 bg-secondary-light p-4 rounded-lg">
            {tribute.avatarUrl && (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={tribute.avatarUrl} 
                  alt={`${tribute.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="text-primary font-display w-8">
              #{index + 1}
            </span>
            <div className="flex-grow">
              <p className="text-white font-semibold">{tribute.name} ({tribute.gender})</p>
              <p className="text-white/70">Status: {tribute.isAlive ? 'Alive' : 'Dead'}</p>
              <p className="text-white/70">Kills: {tribute.kills}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button 
          onClick={onProceed}
          className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
} 