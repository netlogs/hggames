import type { Tribute } from './Tributes';
import type { Events } from './Events';
import { avatarLinks } from './AvatarLinks';
import { processAction } from './ActionProcess';

export let tributes: Tribute[] = [];
export let events: Events = {};
export let currentPhase: string = 'The Bloodbath';
export let dayCount: number = 1;
export let nightCount: number = 1;

// 从localStorage恢复状态
export function loadGameState() {
  const savedTributes = localStorage.getItem('tributes');
  const savedEvents = localStorage.getItem('gameEvents');
  const savedPhase = localStorage.getItem('currentPhase');
  const savedDayCount = localStorage.getItem('dayCount');
  const savedNightCount = localStorage.getItem('nightCount');
  
  if (savedTributes) tributes = JSON.parse(savedTributes);
  if (savedEvents) events = JSON.parse(savedEvents);
  if (savedPhase) currentPhase = savedPhase;
  if (savedDayCount) dayCount = parseInt(savedDayCount);
  if (savedNightCount) nightCount = parseInt(savedNightCount);
  
  console.log('Game state loaded:', {
    tributes,
    events,
    currentPhase,
    dayCount,
    nightCount
  });
}

export function initializeGameData() {
  // 初始化参赛者数据
  tributes = Array(24).fill(null).map((_, index) => ({
    name: `District ${Math.floor(index / 2) + 1} ${index % 2 === 0 ? 'Male' : 'Female'}`,
    status: 'alive',
    killnum: 0,
    weapons: [],
    items: [],
    avatar: avatarLinks[index % avatarLinks.length],
    gender: index % 2 === 0 ? 'Male' : 'Female',
    hasActed: false
  }));

  // 初始化事件数据
  events = {};

  // 初始化计数器
  dayCount = 1;
  nightCount = 1;
}

export function setCurrentPhase(phase: string) {
  currentPhase = phase;
  // 确保events中有对应阶段的数组
  if (!events[phase]) {
    events[phase] = [];
  }
}

export function getCurrentPhase(): string {
  return currentPhase;
}

export function setDayCount(count: number) {
  dayCount = count;
}

export function setNightCount(count: number) {
  nightCount = count;
}

// 更新游戏状态到localStorage
export function updateGameState() {
  localStorage.setItem('tributes', JSON.stringify(tributes));
  localStorage.setItem('gameEvents', JSON.stringify(events));
  localStorage.setItem('currentPhase', currentPhase);
  localStorage.setItem('dayCount', dayCount.toString());
  localStorage.setItem('nightCount', nightCount.toString());
  
}