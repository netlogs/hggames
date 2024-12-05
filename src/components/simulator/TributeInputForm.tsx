import { useState } from 'react';

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
  const [batchUrls, setBatchUrls] = useState('');
  const [error, setError] = useState('');

  const handleBatchUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBatchUrls(text);
    
    // 验证URL数量
    const urls = text.split('\n').filter(url => url.trim());
    if (urls.length > tributes.length) {
      setError(`Too many URLs. Please enter exactly ${tributes.length} URLs.`);
    } else {
      setError('');
    }
  };

  const applyBatchUrls = () => {
    const urls = batchUrls.split('\n').filter(url => url.trim());
    urls.forEach((url, index) => {
      if (index < tributes.length) {
        onInputChange(index, 'avatarUrl', url);
      }
    });
    setBatchUrls(''); // 清空输入框
    setError('');
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-display font-bold mb-6">
        Enter Tribute Details
      </h2>

      {/* 批量URL输入区域 */}
      <div className="mb-8 bg-secondary-light p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-primary">
            Batch Avatar URLs
          </h3>
          <span className="text-sm text-white/60">
            {tributes.length} URLs needed
          </span>
        </div>
        
        <p className="text-white/70 text-sm mb-3">
          Enter one image URL per line. URLs will be assigned to tributes in order.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <textarea
              value={batchUrls}
              onChange={handleBatchUrlsChange}
              placeholder="https://imgur.com/image1.jpg&#10;https://imgur.com/image2.jpg&#10;..."
              className="w-full h-32 bg-secondary border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-primary"
            />
            {error && (
              <p className="text-red-400 mt-1 text-sm">{error}</p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 h-32 overflow-y-auto">
            {batchUrls.split('\n')
              .filter(url => url.trim())
              .map((url, index) => (
                <div key={index} className="relative aspect-square bg-secondary rounded overflow-hidden">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'placeholder.png';
                    }}
                  />
                  <div className="absolute top-1 left-1 bg-black/50 rounded px-2 py-1 text-xs">
                    #{index + 1}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={applyBatchUrls}
            disabled={!!error}
            className={`px-4 py-2 rounded-full font-semibold transition-colors
              ${!!error 
                ? 'bg-primary/50 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-dark'}`}
          >
            Apply URLs
          </button>
        </div>
      </div>

      {/* 玩家详细信息输入区域 */}
      <div className="grid gap-4">
        {tributes.map((tribute, index) => (
          <div key={index} className="flex flex-col gap-2 bg-secondary-light p-4 rounded-lg">
            <div className="flex items-center gap-4">
              {tribute.avatarUrl && (
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={tribute.avatarUrl} 
                    alt={`${tribute.name}'s avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'placeholder.png';
                    }}
                  />
                </div>
              )}
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