import type { Tribute } from "./tribute";

interface DeathsDisplayProps {
  tributes: Tribute[];
  dayCounter: number;
  onContinue: () => void;
}

export default function DeathsDisplay({
  tributes,
  dayCounter,
  onContinue
}: DeathsDisplayProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-display font-bold mb-4 text-center">
        The Fallen
      </h2>
      
      <div className="mb-8 text-center">
        <p className="text-xl text-white/80">
          {tributes.filter(t => t.isAlive).length} tributes remaining
        </p>
      </div>

      {tributes.filter(t => !t.isAlive).length === 0 ? (
        <div className="bg-secondary-light p-6 rounded-lg text-center">
          <p className="text-xl text-white/80">
            All tributes have survived the bloodbath!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {tributes.filter(t => !t.isAlive).map((tribute, index) => (
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

              {tribute.kills > 0 && (
                <div className="mb-3 px-4 py-2 bg-primary/10 rounded">
                  <p className="text-white/90">
                    Kills before death: {tribute.kills}
                  </p>
                </div>
              )}

              {tribute.items.length > 0 && (
                <div className="mb-3 px-4 py-2 bg-secondary/50 rounded">
                  <p className="text-white/90">
                    Items collected: {tribute.items.join(", ")}
                  </p>
                </div>
              )}

              {tribute.weapons.length > 0 && (
                <div className="mb-3 px-4 py-2 bg-secondary/50 rounded">
                  <p className="text-white/90">
                    Weapons collected: {tribute.weapons.join(", ")}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-primary/90">Event History</h4>
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
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button 
          onClick={onContinue}
          className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Continue to Day {dayCounter}
        </button>
      </div>
    </div>
  );
} 