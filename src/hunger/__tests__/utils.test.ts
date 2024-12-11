import { randomNtribute, randomcnt } from '../utils';
import { describe, test, expect } from 'vitest';

describe('Random Number Generation Utils', () => {
  describe('randomNtribute', () => {
    test('生成指定数量的随机数', () => {
      const target = 5;
      const result = randomNtribute(target);
      
      console.log(`\nrandomNtribute(${target}) 生成的随机数:`, result);
      
      // 检查数组长度
      expect(result.length).toBe(target);
      
      // 检查数字是否在0-23范围内
      result.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(24);
      });
      
      // 检查是否有重复数字
      const uniqueNumbers = new Set(result);
      expect(uniqueNumbers.size).toBe(target);
    });
  });

  describe('randomcnt', () => {
    test('生成2到limit个随机数', () => {
      const limit = 10;
      const result = randomcnt(limit);
      
      console.log(`\nrandomcnt(${limit}) 生成的随机数:`, result);
      console.log('生成的数量:', result.length);
      
      // 检查数组长度在2到limit之间
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result.length).toBeLessThanOrEqual(limit);
      
      // 检查数字是否在0-23范围内
      result.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(24);
      });
      
      // 检查是否有重复数字
      const uniqueNumbers = new Set(result);
      expect(uniqueNumbers.size).toBe(result.length);
    });

    test('多次调用生成不同数量的随机数', () => {
      const limit = 10;
      const results = new Map(); // 使用Map来存储每次生成的结果
      
      // 多次调用，检查是否能生成不同数量的随机数
      for (let i = 0; i < 5; i++) {
        const result = randomcnt(limit);
        console.log(`\n第${i + 1}次 randomcnt(${limit}) 生成:`, result);
        console.log('生成的数量:', result.length);
        results.set(i, result.length);
      }
      
      console.log('\n各次生成的数量:', Array.from(results.values()));
      
      // 检查是否生成了不同长度的数组
      const uniqueLengths = new Set(results.values());
      expect(uniqueLengths.size).toBeGreaterThan(1);
    });
  });
}); 