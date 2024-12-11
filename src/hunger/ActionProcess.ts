import { randomNtribute, randomcnt } from './utils';
import { tributes, events } from './MainProcess';
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
export function updateTributeStatus(tributesToUpdate: Tribute[], actionType: string, effect: any) {
  console.log('需要更新状态的参赛者:', tributesToUpdate.map(t => t.name));
  console.log('行为类型:', actionType);

  tributesToUpdate.forEach((tribute, i) => {
    let statusEffect = 'normal';

    if (actionType === 'single') {
      statusEffect = effect.actor || 'normal';
    } else if (actionType === 'two') {
      statusEffect = i === 0 ? effect.actor || 'normal' : effect.target || 'normal';
    } else if (actionType === 'multi') {
      if (effect.winner && i === 0) {
        statusEffect = effect.winner;
      } else if (effect.target && i === tributesToUpdate.length - 1) {
        statusEffect = effect.target;
      } else {
        statusEffect = effect.others || 'normal';
      }
    }

    if (statusEffect === 'death') {
      tribute.status = 'dead';
    } else if (statusEffect === 'injured') {
      tribute.status = 'injuries';
    }

    console.log(`更新 ${tribute.name} 的状态为: ${tribute.status}`);
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
  console.log('执行单人行为');
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
  console.log(eventText);
  
  events[phase].push(eventText);
  
  updateTributeStatus([selectedTribute], 'single', { actor: 'normal' });
  // 使用全局索引来标记tribute
  return markTributeAsActed([globalIndex], unactedTributes);
}

/**
 * 双人行为处理函数
 */
export function twoPersonAction(unactedTributes: Tribute[], phase: string) {
  console.log('执行双人行为');
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
    actionType = Math.floor(Math.random() * 2);
  } else {
    actions = twoPersonActions;
    actionType = Math.floor(Math.random() * 2);
  }
  
  const keys = Object.keys(actions[actionType]);
  const actionKey = keys[Math.floor(Math.random() * keys.length)];
  const { text: actionValue, effect } = actions[actionType][actionKey];
  
  const eventText = `${selectedTributes[0].name} ${actionKey} ${selectedTributes[1].name}${actionValue}`;
  console.log(eventText);
  
  // 将事件添加到对应阶段
  events[phase].push(eventText);
  
  updateTributeStatus(selectedTributes, 'two', effect);
  return markTributeAsActed(globalIndexes, unactedTributes);
}

/**
 * 多人行为处理函数
 */
export function multiPersonAction(unactedTributes: Tribute[], phase: string) {
  console.log('执行多人行为');
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
  if (phaseSpecificTexts && Math.random() < 0.7) { // 70%概率使用阶段特定行为
    actions = phaseSpecificTexts;
    actionType = Math.floor(Math.random() * 2);
  } else {
    actions = multiPersonActions;
    actionType = Math.floor(Math.random() * 2);
  }
  
  const keys = Object.keys(actions[actionType]);
  const actionKey = keys[Math.floor(Math.random() * keys.length)];
  let { text: actionValue, effect } = actions[actionType][actionKey];
  
  // 构建事件文本
  let eventText = '';
  if (actionKey === 'raid' || actionKey === 'fend' || 
      actionKey === 'track' || actionKey === 'ambush' || 
      actionKey === 'sacrifice') {
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
  
  console.log(eventText);
  
  events[phase].push(eventText);
  
  updateTributeStatus(selectedTributes, 'multi', effect);
  return markTributeAsActed(globalIndexes, unactedTributes);
}

/**
 * 行为进程主函数
 */
export function processAction(phase: string) {
  // 获取所有存活的参赛者
  const aliveTributes: Tribute[] = tributes.filter(tribute => tribute.status !== 'dead');
  
  console.log('当前存活人数:', aliveTributes.length);
  
  // 如果没有存活者，直接返回
  if (aliveTributes.length === 0) {
    console.log('没有存活的参赛者');
    return;
  }

  // 重置所有存活tribute的行动标记
  aliveTributes.forEach(tribute => tribute.hasActed = false);
  let unactedTributes = [...aliveTributes];

  // 循环直到所有tribute都行动完毕
  while (hasUnactedTributes(unactedTributes)) {
    const remainingCount = unactedTributes.length;
    console.log('当前未行动人数:', remainingCount);

    let actionType: number;

    // 根据剩余人数决定可执行的行为类型
    if (remainingCount === 1) {
      // 只剩1人时，直接执行单人行为
      actionType = 0;
    } else if (remainingCount <= 3) {
      // 剩余2-3人时，随机执行单人或双人行为
      actionType = Math.floor(Math.random() * 2); // 生成0或1
    } else {
      // 剩余>=4人时，可以执行所有类型的行为
      actionType = Math.floor(Math.random() * 3); // 生成0-2之间的随机整数
    }

    //console.log('行为类型:', actionType);

    // 执行对应的行为
    switch (actionType) {
      case 0:
        unactedTributes = singlePersonAction(unactedTributes, phase);
        break;
      case 1:
        unactedTributes = twoPersonAction(unactedTributes, phase);
        break;
      case 2:
        unactedTributes = multiPersonAction(unactedTributes, phase);
        break;
    }
  }
  console.log('所有tribute都行动完毕');
  console.log('当前所有阶段events', events);
} 

