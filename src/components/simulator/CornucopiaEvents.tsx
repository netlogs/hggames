import type { Tribute } from "./tribute";

interface CornucopiaEventsProps {
  tributes: Tribute[];
  onContinue: () => void;
}

export default function CornucopiaEvents({
  tributes,
  onContinue
}: CornucopiaEventsProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-display font-bold mb-4 text-center">
        The Bloodbath
      </h2>
      
      <div className="grid gap-6">
        {tributes.map((tribute, index) => (
          <div key={index} className="bg-secondary-light p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary font-display text-2xl">
                #{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{tribute.name}</h3>
                <p className="text-white/60">{tribute.gender}</p>
              </div>
            </div>

            <div className="space-y-2">
              {tribute.events.map((event, eventIndex) => (
                <div 
                  key={eventIndex}
                  className="px-4 py-2 bg-secondary/30 rounded text-white/80"
                >
                  {event}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              <span className={`px-3 py-1 rounded-full ${tribute.isAlive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {tribute.isAlive ? 'Survived' : 'Deceased'}
              </span>
              {tribute.kills > 0 && (
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary">
                  {tribute.kills} kills
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={onContinue}
          className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
        >
          View The Fallen
        </button>
      </div>
    </div>
  );
} 