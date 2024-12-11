/**
 * 生成指定数量和范围的不重复随机整数
 * @param target 需要生成的随机数数量
 * @param range 随机数的范围(0 到 range-1)
 * @returns 包含target个不重复随机整数的数组
 */
export function randomNtribute(target: number, range: number): number[] {
  // 确保range合法
  if (range <= 0) return [];
  // 确保target不超过range
  target = Math.min(target, range);
  
  const numbers = Array.from({ length: range }, (_, i) => i); // 创建0到range-1的数组
  const result: number[] = [];
  
  // Fisher-Yates 洗牌算法
  for (let i = 0; i < target; i++) {
    const randomIndex = Math.floor(Math.random() * (range - i));
    result.push(numbers[randomIndex]);
    numbers[randomIndex] = numbers[range - 1 - i];
  }
  
  return result;
}

/**
 * 生成2到limit个不重复的随机整数
 * @param limit 随机数的上限
 * @param range 随机数的范围(0 到 range-1)
 * @returns 包含2到limit个不重复随机整数的数组
 */
export function randomcnt(limit: number, range: number): number[] {
  // 确保range合法
  if (range <= 0) return [];
  // 确保limit不超过range
  limit = Math.min(limit, range);
  
  // 首先随机决定要生成多少个数
  const count = Math.floor(Math.random() * (limit - 1)) + 2; // 2到limit之间的随机数
  
  // 使用randomNtribute生成指定数量和范围的随机数
  return randomNtribute(count, range);
} 