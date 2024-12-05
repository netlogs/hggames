import { useState, useEffect } from 'react';
import TributeCountForm from './TributeCountForm';
import TributeInputForm from './TributeInputForm';
import TributeStatus from './TributeStatus';
import CornucopiaEvents from './CornucopiaEvents';
import DayEvents from './DayEvents';
import DeathsDisplay from './DeathsDisplay';
import WinnerDisplay from './WinnerDisplay';
import { meleeweapon, itemsToFind, weapons, cornucopia, injury, misc } from './gamedata'
import type { Tribute } from './tribute';

let dayCounter = 0;

export default function TributeSetup() {
  const [tributeCount, setTributeCount] = useState<number>(0);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [showTributeInputs, setShowTributeInputs] = useState(false);
  const [showTributeStatus, setShowTributeStatus] = useState(false);
  const [showDeaths, setShowDeaths] = useState(false);
  const [showCornucopia, setShowCornucopia] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [dayEvents, setDayEvents] = useState<string[]>([]);
  const [showDayEvents, setShowDayEvents] = useState(false);

  const handleTributeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input value:', value); // 调试日志

    // 处理空输入
    if (value === '' || value === null) {
      console.log('Empty input detected');
      setTributeCount(0);
      return;
    }

    // 确保是有效数字
    const numValue = Number(value);
    console.log('Parsed number:', numValue); // 调试日志

    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, 0), 24);
      console.log('Setting tribute count to:', clampedValue); // 调试日志
      setTributeCount(clampedValue);
    }
  };

  // 使用useEffect来监控tributeCount的变化
  useEffect(() => {
    console.log('Current tribute count:', tributeCount);
  }, [tributeCount]);

  const isGenerateButtonEnabled = tributeCount >= 2 && tributeCount <= 24;
  
  const handleGenerate = () => {
    console.log('Generate button clicked, tribute count:', tributeCount); // 调试日志
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

  const handleInputChange = (index: number, field: keyof Tribute, value: string) => {
    const updatedTributes = [...tributes];
    updatedTributes[index][field] = value;
    setTributes(updatedTributes);
  };

  const registerNames = () => {
    const initializedTributes = tributes.map(tribute => ({
      ...tribute,
      isAlive: true,
      kills: 0,
      events: [],
      items: [],
      weapons: []
    }));
    setTributes(initializedTributes);
    setShowTributeInputs(false);
    setShowTributeStatus(true);
  };

  const cornucopiaNow = () => {
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
    
    setTributes(updatedTributes);
    
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
    
    setShowCornucopia(true);
    setShowTributeStatus(false);
  };

  const toDeaths = () => {
    console.log("Showing deaths screen...");
    setShowCornucopia(false);
    setShowDayEvents(false);
    setShowDeaths(true);
  };

  const simulateDay = () => {
    console.log("Simulating day...");

    const events: string[] = [];

    const updatedTributes = tributes.map(tribute => {
      if (!tribute.isAlive) return tribute;

      // 随机生成事件
      const eventRoll = Math.random();
      if (eventRoll < 0.3) {
        // 战斗事件
        const opponents = tributes.filter(t => t.isAlive && t.name !== tribute.name);
        if (opponents.length > 0) {
          const opponent = opponents[Math.floor(Math.random() * opponents.length)];
          const opponentIndex = tributes.findIndex(t => t.name === opponent.name);

          const weapon = tribute.weapons[0] || "bare hands";
          const isMelee = weapon === "melee";
          let attackDescription = '';

          if (isMelee) {
            const meleeWeapon = meleeweapon[Math.floor(Math.random() * meleeweapon.length)];
            attackDescription = `with a ${meleeWeapon}`;
            tribute.weapons[0] = meleeWeapon;
          }

          if (Math.random() > 0.5) {
            // 当前参与者获胜
            tributes[opponentIndex].isAlive = false;
            tribute.kills += 1;
            const killMessage = `Day ${dayCounter}: ${tribute.name} kills ${opponent.name} ${attackDescription}`;
            tribute.events.push(killMessage);
            tributes[opponentIndex].events.push(`Day ${dayCounter}: Killed by ${tribute.name}`);
            events.push(killMessage);
          } else {
            // 对手获胜
            tribute.isAlive = false;
            tributes[opponentIndex].kills += 1;
            const killMessage = `Day ${dayCounter}: ${opponent.name} kills ${tribute.name} ${attackDescription}`;
            tributes[opponentIndex].events.push(killMessage);
            tribute.events.push(`Day ${dayCounter}: Killed by ${opponent.name}`);
            events.push(killMessage);
          }
        }
      } else if (eventRoll < 0.6) {
        // 物品使用或受伤
        if (tribute.items.length > 0) {
          const item = tribute.items.pop();
          const eventMessage = `Day ${dayCounter}: ${tribute.name} uses ${item}`;
          tribute.events.push(eventMessage);
          events.push(eventMessage);
        } else {
          const injuryEvent = injury[Math.floor(Math.random() * injury.length)];
          const eventMessage = `Day ${dayCounter}: ${tribute.name} ${injuryEvent}`;
          tribute.events.push(eventMessage);
          events.push(eventMessage);
        }
      } else {
        // 日常行为
        const miscEvent = misc[Math.floor(Math.random() * misc.length)];
        const eventMessage = `Day ${dayCounter}: ${tribute.name} ${miscEvent}`;
        tribute.events.push(eventMessage);
        events.push(eventMessage);
      }

      return tribute;
    });

    setDayEvents(events);
    setShowDeaths(false);
    setShowDayEvents(true);
    setTributes(updatedTributes);
  };

  const declareWinner = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length === 1) {
      setShowWinner(true);
      setShowDayEvents(false);
      setShowDeaths(false);
      setShowCornucopia(false);
      setShowTributeStatus(false);
    }
  };

  const resetGame = () => {
    setTributeCount(0);
    setTributes([]);
    setShowTributeInputs(false);
    setShowTributeStatus(false);
    setShowDeaths(false);
    setShowCornucopia(false);
    setShowWinner(false);
    dayCounter = 0;
  };

  const proceedToDay = () => {
    console.log("Proceeding to day...");
    
    declareWinner();

    if (dayCounter === 0) {
      cornucopiaNow();
    } else {
      simulateDay();
    declareWinner();
    }
    dayCounter++;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!showTributeInputs && !showTributeStatus && !showDeaths && !showCornucopia && !showWinner && !showDayEvents && (
        <TributeCountForm 
          tributeCount={tributeCount}
          onCountChange={handleTributeCountChange}
          onGenerate={handleGenerate}
          isGenerateEnabled={isGenerateButtonEnabled}
        />
      )}

      {showTributeInputs && !showTributeStatus && (
        <TributeInputForm
          tributes={tributes}
          onInputChange={handleInputChange} 
          onBack={() => setShowTributeInputs(false)}
          onConfirm={registerNames}
        />
      )}

      {showTributeStatus && !showDeaths && !showCornucopia && !showWinner && !showDayEvents && (
        <TributeStatus
          tributes={tributes}
          onProceed={proceedToDay}
        />
      )}

      {showCornucopia && (
        <CornucopiaEvents 
          tributes={tributes}
          onContinue={toDeaths}
        />
      )}

      {showDayEvents && (
        <DayEvents
          events={dayEvents}
          onContinue={toDeaths} 
        />
      )}

      {showDeaths && (
        <DeathsDisplay
          tributes={tributes}
          dayCounter={dayCounter}
          onContinue={proceedToDay}
        />
      )}

      {showWinner && (
        <WinnerDisplay
          tributes={tributes}
          dayCounter={dayCounter}
          onRestart={resetGame}
        />
      )}
    </div>
  );
} 