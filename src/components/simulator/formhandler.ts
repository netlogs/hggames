import type { Tribute } from './tribute';

export const handleTributeCountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTributeCount: (count: number) => void
) => {
  const value = e.target.value;
  console.log('Input value:', value);

  // 处理空输入
  if (value === '' || value === null) {
    console.log('Empty input detected');
    setTributeCount(0);
    return;
  }

  // 确保是有效数字
  const numValue = Number(value);
  console.log('Parsed number:', numValue);

  if (!isNaN(numValue)) {
    const clampedValue = Math.min(Math.max(numValue, 0), 24);
    console.log('Setting tribute count to:', clampedValue);
    setTributeCount(clampedValue);
  }
};

/*
export const handleGenerate = (
  tributeCount: number,
  isGenerateButtonEnabled: boolean,
  setTributes: (tributes: Tribute[]) => void,
  setShowTributeInputs: (show: boolean) => void
) => {
  console.log('Generate button clicked, tribute count:', tributeCount);
  if (isGenerateButtonEnabled) {
    setTributes(Array.from({ length: tributeCount }, () => ({ 
      name: '', 
      gender: 'male', 
      isAlive: true, 
      kills: 0, 
      events: [],
      items: [],
      weapons: []
    })));
    setShowTributeInputs(true);
  }
};
*/