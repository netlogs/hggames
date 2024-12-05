import type { Tribute } from "./tribute";

interface WinnerDisplayProps {
  tributes: Tribute[];
  dayCounter: number;
  onRestart: () => void;
}

export default function WinnerDisplay({
  tributes,
  dayCounter,
  onRestart
}: WinnerDisplayProps) {
  return (
    <div className="animate-fade-in">
      <div className="bg-secondary-light p-8 rounded-lg text-center">
        <h2 className="text-4xl font-display font-bold mb-6 text-primary">
          Victory Royale
        </h2>
        
        {tributes.filter(t => t.isAlive).map(winner => (
          <div key={winner.name} className="space-y-6">
            <div className="text-3xl font-semibold mb-2">
              {winner.name}
            </div>
            
            <div className="flex justify-center items-center gap-4">
              <span className="px-4 py-2 bg-primary/20 rounded-full text-primary">
                {winner.kills} Kills
              </span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400">
                Last One Standing
              </span>
            </div>

            {winner.items.length > 0 && (
              <div className="px-4 py-2 bg-secondary/30 rounded">
                <h3 className="font-semibold mb-2">Collected Items</h3>
                <p className="text-white/80">{winner.items.join(", ")}</p>
              </div>
            )}
            
            {winner.weapons.length > 0 && (
              <div className="px-4 py-2 bg-secondary/30 rounded">
                <h3 className="font-semibold mb-2">Weapons</h3>
                <p className="text-white/80">{winner.weapons.join(", ")}</p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Victory Journey</h3>
              <div className="space-y-2">
                {winner.events.map((event, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-secondary/30 rounded text-white/80"
                  >
                    {event}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-secondary/30 rounded">
              <h3 className="font-semibold mb-2">Game Statistics</h3>
              <p className="text-white/80">
                Survived for {dayCounter} days
              </p>
              <p className="text-white/80">
                Defeated {tributes.length - 1} opponents
              </p>
            </div>
          </div>
        ))}

        <div className="mt-8">
          <button 
            onClick={onRestart}
            className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Start New Game
          </button>
        </div>
      </div>
    </div>
  );
} 