import type { Tribute } from './tribute';
import { weapons, itemsToFind, cornucopia } from './gamedata';

export const cornucopiaNow = (
  tributes: Tribute[],
  dayCounter: number
): { updatedTributes: Tribute[], eventDescriptions: string[] } => {
  console.log("Starting cornucopiaNow...");
  
  const eventDescriptions: string[] = [];
  let remainingTributes = tributes.length;
  
  const updatedTributes = tributes.map(tribute => ({
    ...tribute,
    hasActed: false
  }));

  while (remainingTributes > 0) {
    const availableTributes = updatedTributes.filter(t => !t.hasActed && t.isAlive);
    if (availableTributes.length === 0) break;
    
    const currentTribute = availableTributes[Math.floor(Math.random() * availableTributes.length)];
    const tributeIndex = updatedTributes.findIndex(t => t.name === currentTribute.name);
    
    const actionType = cornucopia[Math.floor(Math.random() * cornucopia.length)];
    
    switch (actionType) {
      case "run":
        eventDescriptions.push(`${currentTribute.name} runs away from the Cornucopia.`);
        break;
        
      case "supply":
        const item = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
        updatedTributes[tributeIndex].items.push(item);
        eventDescriptions.push(`${currentTribute.name} grabs ${item} from the Cornucopia.`);
        break;
        
      case "weapon":
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        updatedTributes[tributeIndex].weapons.push(weapon);
        eventDescriptions.push(`${currentTribute.name} grabs a ${weapon}.`);
        break;
        
      case "battle":
        const opponents = availableTributes.filter(t => t.name !== currentTribute.name);
        if (opponents.length > 0) {
          const opponent = opponents[Math.floor(Math.random() * opponents.length)];
          const opponentIndex = updatedTributes.findIndex(t => t.name === opponent.name);
          
          if (Math.random() > 0.5) { // 当前参与者获胜
            updatedTributes[opponentIndex].isAlive = false;
            updatedTributes[tributeIndex].kills += 1;
            
            const weapon = currentTribute.weapons[0] || "bare hands";
            const killMessage = `${currentTribute.name} kills ${opponent.name} with ${weapon}.`;
            eventDescriptions.push(killMessage);
            updatedTributes[tributeIndex].events.push(killMessage);
            updatedTributes[opponentIndex].events.push(`Killed by ${currentTribute.name} in the bloodbath.`);
          } else { // 对手获胜
            updatedTributes[tributeIndex].isAlive = false;
            updatedTributes[opponentIndex].kills += 1;
            
            const weapon = opponent.weapons[0] || "bare hands";
            const killMessage = `${opponent.name} kills ${currentTribute.name} with ${weapon}.`;
            eventDescriptions.push(killMessage);
            updatedTributes[opponentIndex].events.push(killMessage);
            updatedTributes[tributeIndex].events.push(`Killed by ${opponent.name} in the bloodbath.`);
          }
        }
        break;
    }
    
    updatedTributes[tributeIndex].hasActed = true;
    remainingTributes--;
  }

  // 添加事件总结
  updatedTributes.forEach(tribute => {
    if (!tribute.isAlive) {
      tribute.events.push(`Day ${dayCounter}: Died in the bloodbath`);
    } else {
      const itemSummary = tribute.items.length > 0 ? 
        tribute.items.map(item => `grabs ${item} from Cornucopia`).join(", ") : 
        "Obtained no items";
      tribute.events.push(`Day ${dayCounter}: Survived the bloodbath. ${itemSummary}`);
    }
  });

  return { updatedTributes, eventDescriptions };
};