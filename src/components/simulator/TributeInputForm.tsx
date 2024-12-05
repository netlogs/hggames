import type { Tribute } from "./tribute";

interface TributeInputFormProps {
  tributes: Tribute[];
  onInputChange: (index: number, field: keyof Tribute, value: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export default function TributeInputForm({
  tributes,
  onInputChange,
  onBack,
  onConfirm
}: TributeInputFormProps) {
  return (
    <div className="animate-fade-in">
      <div className="grid gap-4">
        {tributes.map((tribute, index) => (
          <div key={index} className="flex flex-col gap-2 bg-secondary-light p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-primary font-display w-8">
                #{index + 1}
              </span>
              <input
                type="text"
                placeholder="Tribute Name"
                value={tribute.name}
                onChange={(e) => onInputChange(index, 'name', e.target.value)}
                className="flex-grow bg-secondary border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-primary"
              />
              <select 
                value={tribute.gender}
                onChange={(e) => onInputChange(index, 'gender', e.target.value)}
                className="bg-secondary border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-primary"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <input
              type="url"
              placeholder="Avatar URL"
              value={tribute.avatarUrl || ''}
              onChange={(e) => onInputChange(index, 'avatarUrl', e.target.value)}
              className="bg-secondary border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-semibold transition-colors mr-4"
        >
          Back
        </button>
        <button 
          onClick={onConfirm}
          className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
        >
          Confirm Names
        </button>
      </div>
    </div>
  );
} 