import { randomNtribute, randomcnt } from './utils';
import { tributes, events, killEvents } from './MainProcess';
import type { Tribute } from './Tributes';
import { singlePersonActions, twoPersonActions, multiPersonActions, phaseSpecificActions } from './ActionTexts';

/**
 * 检查是否还有未行动的tribute
 */
function hasUnactedTributes(unactedTributes: Tribute[]): boolean {
  return unactedTributes.length > 0;
}

/**
 * 标记tribute为已行动
 */
function markTributeAsActed(tributeIndexes: number[], unactedTributes: Tribute[]) {
  tributeIndexes.forEach(index => {
    tributes[index].hasActed = true;
  });
  // 更新未行动tribute集合
  return unactedTributes.filter(t => !t.hasActed);
}

/**
 * 更新参赛者状态的函数
 * @param tributesToUpdate 需要更新状态的参赛者对象数组
 * @param actionType 行为类型（用于后续确定如何更新状态）
 * @param effect 状态影响信息
 */
export function updateTributeStatus(tributesToUpdate: Tribute[], actionType: string, effect: any, currentEvent: any) {
  const currentPhase = localStorage.getItem('currentPhase') || 'The Bloodbath';

  // 确保events数组已初始化
  if (!events[currentPhase]) {
    events[currentPhase] = [];
  }
  if (!killEvents[currentPhase]) {
    killEvents[currentPhase] = [];
  }

  tributesToUpdate.forEach((tribute, i) => {
    let statusEffect = 'normal';

    if (actionType === 'single') {
      statusEffect = effect.actor || 'normal';
    } else if (actionType === 'two') {
      statusEffect = i === 0 ? effect.actor || 'normal' : effect.target || 'normal';
      if (i === 1 && effect.target === 'death') {
        tributesToUpdate[0].killnum++;
        // 添加kill事件
        killEvents[currentPhase].push(currentEvent);
      }
    } else if (actionType === 'multi') {
      if (effect.winner && i === 0) {
        statusEffect = effect.winner;
        if (effect.others === 'death') {
          tribute.killnum += tributesToUpdate.length - 1;
          // 添加kill事件
          killEvents[currentPhase].push(currentEvent);
        }
      } else if (effect.target && i === tributesToUpdate.length - 1) {
        statusEffect = effect.target;
        if (effect.target === 'death') {
          tributesToUpdate.slice(0, -1).forEach(t => t.killnum++);
          // 添加kill事件
          killEvents[currentPhase].push(currentEvent);
        }
      } else {
        statusEffect = effect.others || 'normal';
      }
    }

    if (statusEffect === 'death') {
      tribute.status = 'dead';
      // 对于非战斗死亡,也添加kill事件
      if (!killEvents[currentPhase].includes(currentEvent)) {
        killEvents[currentPhase].push(currentEvent);
      }
    } else if (statusEffect === 'injured') {
      tribute.status = 'injuries';
    }
  });
}

/**
 * 根据阶段获取对应的行为文本
 */
function getPhaseActions(phase: string, actionType: string) {
  if (phaseSpecificActions[phase]) {
    switch(actionType) {
      case 'single':
        return phaseSpecificActions[phase].singlePerson;
      case 'two':
        return phaseSpecificActions[phase].twoPerson;
      case 'multi':
        return phaseSpecificActions[phase].multiPerson;
      default:
        return null;
    }
  }
  return null;
}

/**
 * 单人行为处理函数
 */
export function singlePersonAction(unactedTributes: Tribute[], phase: string) {
  if (unactedTributes.length === 0) return unactedTributes;
  
  const [selectedIndex] = randomNtribute(1, unactedTributes.length);
  const selectedTribute = unactedTributes[selectedIndex];
  
  // 获取在全局tributes中的索引
  const globalIndex = tributes.findIndex(t => t === selectedTribute);
  
  // 获取阶段特定行为
  const phaseSpecificTexts = getPhaseActions(phase, 'single');
  
  // 随机选择一个行为文本
  let actionText;
  if (phaseSpecificTexts && Math.random() < 0.7) { // 70%概率使用阶段特定行为
    actionText = phaseSpecificTexts[Math.floor(Math.random() * phaseSpecificTexts.length)];
  } else {
    actionText = singlePersonActions[Math.floor(Math.random() * singlePersonActions.length)];
  }
  
  const eventText = `${selectedTribute.name} ${actionText}`;
  
  const currentEvent = {
    text: eventText,
    tributes: [{
      name: selectedTribute.name,
      avatar: selectedTribute.avatar
    }]
  };
  events[phase].push(currentEvent);
  
  updateTributeStatus([selectedTribute], 'single', { actor: 'normal' }, currentEvent);
  // 使用全局索引来标记tribute
  return markTributeAsActed([globalIndex], unactedTributes);
}

/**
 * 双人行为处理函数
 */
export function twoPersonAction(unactedTributes: Tribute[], phase: string, deathProbability: number = 0.3) {
  if (unactedTributes.length < 2) return unactedTributes;
  
  const selectedIndexes = randomNtribute(2, unactedTributes.length);
  const selectedTributes = selectedIndexes.map(index => unactedTributes[index]);
  
  // 获取全局索引
  const globalIndexes = selectedTributes.map(tribute => 
    tributes.findIndex(t => t === tribute)
  );
  
  // 获取阶段特定行为
  const phaseSpecificTexts = getPhaseActions(phase, 'two');
  
  let actions, actionType;
  if (phaseSpecificTexts && Math.random() < 0.7) { // 70%概率使用阶段特定行为
    actions = phaseSpecificTexts;
    actionType = Math.random() < deathProbability ? 0 : 1;
  } else {
    actions = twoPersonActions;
    // 根据死亡概率决定是否使用纯致命事件(key=3)
    if (Math.random() < deathProbability) {
      actionType = 3;  // 使用纯致命事件
    } else {
      actionType = Math.random() < 0.5 ? 0 : 1;  // 在普通和混合事件间随机
    }
  }
  
  const keys = Object.keys(actions[actionType]);
  const actionKey = keys[Math.floor(Math.random() * keys.length)];
  const { text: actionValue, effect } = actions[actionType][actionKey];
  
  const eventText = `${selectedTributes[0].name} ${actionKey} ${selectedTributes[1].name}${actionValue}`;
  
  const currentEvent = {
    text: eventText,
    tributes: selectedTributes.map(t => ({
      name: t.name,
      avatar: t.avatar
    }))
  };
  events[phase].push(currentEvent);
  
  updateTributeStatus(selectedTributes, 'two', effect, currentEvent);
  return markTributeAsActed(globalIndexes, unactedTributes);
}

/**
 * 多人行为处理函数
 */
export function multiPersonAction(unactedTributes: Tribute[], phase: string, deathProbability: number = 0.3) {
  if (unactedTributes.length < 4) return unactedTributes;
  
  const selectedIndexes = randomcnt(4, unactedTributes.length);
  const selectedTributes = selectedIndexes.map(index => unactedTributes[index]);
  
  // 获取全局索引
  const globalIndexes = selectedTributes.map(tribute => 
    tributes.findIndex(t => t === tribute)
  );
  
  // 获取阶段特定行为
  const phaseSpecificTexts = getPhaseActions(phase, 'multi');
  
  let actions, actionType;
  if (phaseSpecificTexts && Math.random() < 0.7) { // 70%概率使用段特定行为
    actions = phaseSpecificTexts;
    actionType = Math.random() < deathProbability ? 1 : 0;
  } else {
    actions = multiPersonActions;
    // 根据死亡概率决定是否使用纯致命事件(key=3)
    if (Math.random() < deathProbability) {
      actionType = 3;  // 使用纯致命事件
    } else {
      actionType = Math.random() < 0.5 ? 0 : 1;  // 在普通和混合事件间随机
    }
  }
  
  const keys = Object.keys(actions[actionType]);
  const actionKey = keys[Math.floor(Math.random() * keys.length)];
  let { text: actionValue, effect } = actions[actionType][actionKey];
  
  // 构建事件文本
  let eventText = '';
  if (actionKey === 'raid' || actionKey === 'fend' || 
      actionKey === 'track' || actionKey === 'ambush' || 
      actionKey === 'sacrifice' || actionKey === 'gang') {
    const targetTribute = selectedTributes[selectedTributes.length - 1];
    const pronoun = targetTribute.gender === 'Male' ? 'he' : 'she';
    const possessive = targetTribute.gender === 'Male' ? 'his' : 'her';

    actionValue = actionValue.replace('{target}', targetTribute.name)
                           .replace('{pronoun}', pronoun)
                           .replace('{possessive}', possessive);
    eventText = `${selectedTributes.slice(0, -1).map(t => t.name).join(', ')} ${actionValue}`;
  } else if (actionKey === 'fight' || actionKey === 'battle' || 
             actionKey === 'betray' || actionKey === 'chaos') {
    const winner = selectedTributes[0].name;
    actionValue = actionValue.replace('{winner}', winner);
    eventText = `${selectedTributes.map(t => t.name).join(', ')} ${actionValue}`;
  } else {
    eventText = `${selectedTributes.map(t => t.name).join(', ')} ${actionValue}`;
  }
  
  
  const currentEvent = {
    text: eventText,
    tributes: selectedTributes.map(t => ({
      name: t.name,
      avatar: t.avatar
    }))
  };
  events[phase].push(currentEvent);
  
  updateTributeStatus(selectedTributes, 'multi', effect, currentEvent);
  return markTributeAsActed(globalIndexes, unactedTributes);
}

/**
 * 行为进程主函数
 */
export function processAction(phase: string) {
  // 获取所有存活的参赛者
  const aliveTributes: Tribute[] = tributes.filter(tribute => tribute.status !== 'dead');
  
  // 如果没有存活者，直接返回
  if (aliveTributes.length === 0) {
    return;
  }

  // 重置所有存活tribute的行动标记
  aliveTributes.forEach(tribute => tribute.hasActed = false);
  let unactedTributes = [...aliveTributes];

  // 根据存活人数计算死亡事件概率系数
  const deathProbabilityMultiplier = calculateDeathProbability(aliveTributes.length);

  // 循环直到所有tribute都行动完毕
  while (hasUnactedTributes(unactedTributes)) {
    const remainingCount = unactedTributes.length;

    let actionType: number;

    // 根据剩余人数决定可执行的行为类型
    if (remainingCount === 1) {
      actionType = 0;
    } else if (remainingCount <= 3) {
      // 当存活人数较少时，提高选择双人事件的概率
      actionType = Math.random() < deathProbabilityMultiplier ? 1 : 0;
    } else {
      // 存活人数>=4时，根据死亡概率系数调整各类型事件的概率
      const rand = Math.random();
      if (rand < deathProbabilityMultiplier * 0.4) { // 提高多人事件概率
        actionType = 2;
      } else if (rand < deathProbabilityMultiplier * 0.7) { // 提高双人事件概率
        actionType = 1;
      } else {
        actionType = 0;
      }
    }

    // 执行对应的行为
    switch (actionType) {
      case 0:
        unactedTributes = singlePersonAction(unactedTributes, phase);
        break;
      case 1:
        unactedTributes = twoPersonAction(unactedTributes, phase, deathProbabilityMultiplier);
        break;
      case 2:
        unactedTributes = multiPersonAction(unactedTributes, phase, deathProbabilityMultiplier);
        break;
    }
  }
}

/**
 * 根据存活人数计算死亡事件概率系数
 */
function calculateDeathProbability(aliveCount: number): number {
  if (aliveCount <= 3) {
    return 0.9; // 剩余1-3人时，90%概率触发致命事件
  } else if (aliveCount <= 6) {
    return 0.7; // 剩余4-6人时，70%概率触发致命事件
  } else if (aliveCount <= 10) {
    return 0.5; // 剩余7-10人时，50%概率触发致命事件
  } else {
    return 0.3; // 超过10人时，保持30%的基础致命事件概率
  }
}

