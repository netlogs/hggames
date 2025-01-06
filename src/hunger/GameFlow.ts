import { currentPhase, events, setCurrentPhase, dayCount, nightCount, setDayCount, setNightCount, loadGameState, updateGameState, tributes, initializeGameData } from './MainProcess';
import { processAction } from './ActionProcess';

// 初始化新游戏
export function initGame() {
  // 初始化基础数据
  //initializeGameData();
  
  // 设置初始阶段
  setCurrentPhase('The Bloodbath');
  
  // 确保events中有bloodbath数组
  if (!events['The Bloodbath']) {
    events['The Bloodbath'] = [];
  }
  
  // 生成bloodbath事件
  processAction('The Bloodbath');
  
  // 保存初始状态
  updateGameState();
  
}

// 处理当前阶段并进入下一阶段
export async function processGamePhase() {
  // 首先加载保存的状态
  loadGameState();
  
  const currentPath = window.location.pathname;
  
  // 检查存活人数
  const aliveCount = tributes.filter(t => t.status !== 'dead').length;
  
  // 如果只剩1人,游戏结束
  if (aliveCount <= 1) {
    updateGameState();
    window.location.href = '/winner';
    return;
  }

  // 根据当前页面决定下一步
  switch (currentPath) {
    case '/':
      window.location.href = '/bloodbath';
      break;
    case '/reaping':
      window.location.href = '/bloodbath';
      break;
    case '/customize':
      window.location.href = '/bloodbath';
      break;

    case '/bloodbath':
      setCurrentPhase(`day${dayCount}`);
      processAction(currentPhase);
      updateGameState();
      window.location.href = '/day';
      break;
      
    case '/day':
      setNightCount(dayCount); // 设置nightCount与当前dayCount相同
      setCurrentPhase(`night${nightCount}`);
      processAction(currentPhase);
      updateGameState();
      window.location.href = '/night';
      break;
      
    case '/night':
      const newDayCount = dayCount + 1;  // 明确计算新的值
      
      setDayCount(newDayCount);  // 设置新值
      setCurrentPhase(`night${nightCount}`);  // 确保phase也正确设置
      
      // 立即验证更新是否成功
      
      updateGameState();  // 保存新状态
      
      // 再次验证状态
      window.location.href = '/fallen';
      break;
      
    case '/fallen':
      setCurrentPhase(`day${dayCount}`);
      processAction(currentPhase);
      updateGameState();
      window.location.href = '/day';
      break;
  }
} 