interface DayEventsProps {
  events: string[];
  onContinue: () => void;
}

export default function DayEvents({
  events,
  onContinue
}: DayEventsProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-display font-bold mb-4 text-center">
        Day Events
      </h2>
      
      <div className="grid gap-4 mb-8">
        {events.map((event, index) => (
          <div key={index} className="bg-secondary-light p-4 rounded-lg">
            <p className="text-white">{event}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={onContinue}
          className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
        >
          View The Fallen
        </button>
      </div>
    </div>
  );
} 