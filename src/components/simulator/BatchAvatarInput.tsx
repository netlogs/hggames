interface BatchAvatarInputProps {
  tributeCount: number;
  onSubmit: (urls: string[]) => void;
  onClose: () => void;
}

export default function BatchAvatarInput({
  tributeCount,
  onSubmit,
  onClose
}: BatchAvatarInputProps) {
  const [inputText, setInputText] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    
    // 解析URL并更新预览
    const urls = text.split('\n').filter(url => url.trim());
    setPreviewUrls(urls);
    
    // 验证URL数量
    if (urls.length > tributeCount) {
      setError(`Too many URLs. Please enter exactly ${tributeCount} URLs.`);
    } else if (urls.length < tributeCount) {
      setError(`Please enter ${tributeCount} URLs (currently ${urls.length}).`);
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    const urls = inputText.split('\n').filter(url => url.trim());
    if (urls.length !== tributeCount) {
      setError(`Please enter exactly ${tributeCount} URLs.`);
      return;
    }
    onSubmit(urls);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-secondary-light rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Batch Avatar URLs Input
          </h3>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="text-white/70 mb-4">
          Enter one image URL per line (total {tributeCount} URLs needed)
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="https://imgur.com/image1.jpg&#10;https://imgur.com/image2.jpg&#10;..."
              className="w-full h-64 bg-secondary border border-white/10 rounded p-3 focus:outline-none focus:border-primary"
            />
            {error && (
              <p className="text-red-400 mt-2 text-sm">
                {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 h-64 overflow-y-auto">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative aspect-square bg-secondary rounded overflow-hidden">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'placeholder.png'; // 设置一个默认图片
                  }}
                />
                <div className="absolute top-1 left-1 bg-black/50 rounded px-2 py-1 text-xs">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!!error || previewUrls.length !== tributeCount}
            className={`px-6 py-2 rounded-full font-semibold transition-colors
              ${!!error || previewUrls.length !== tributeCount
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
              }`}
          >
            Apply URLs
          </button>
        </div>
      </div>
    </div>
  );
} 