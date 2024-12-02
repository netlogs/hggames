import { useState, useEffect } from 'react';

// 导入必要的数组
const weapons = [
  "landmine", "bow", "melee", "paintball", "basketball",
  "octobrush", "fidget spinner", "assault rifle", "frisbee", "tank"
];

const itemsToFind = [
  "fruit tree", "poisonous fruit tree", "clean water", "clean coal",
  // ... 其他物品
];

const cornucopia = ["run", "supply", "weapon", "battle"];

interface Tribute {
  name: string;
  gender: string;
  isAlive: boolean;
  kills: number;
  events: string[];
  items: string[];
  weapons: string[];
  hasActed?: boolean;
}

let dayCounter = 0;

export default function TributeSetup() {
  const [tributeCount, setTributeCount] = useState<number>(0);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [showTributeInputs, setShowTributeInputs] = useState(false);
  const [showTributeStatus, setShowTributeStatus] = useState(false);
  const [showDeaths, setShowDeaths] = useState(false);
  const [showCornucopia, setShowCornucopia] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

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
          `Obtained: ${tribute.items.join(", ")}` : 
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
    setShowDeaths(true);
  };

  const simulateDay = () => {
    console.log("Simulating day...");

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

          if (Math.random() > 0.5) {
            // 当前参与者获胜
            tributes[opponentIndex].isAlive = false;
            tribute.kills += 1;
            const weapon = tribute.weapons[0] || "bare hands";
            const killMessage = `${tribute.name} kills ${opponent.name} with ${weapon}.`;
            tribute.events.push(killMessage);
            tributes[opponentIndex].events.push(`Killed by ${tribute.name}.`);
          } else {
            // 对手获胜
            tribute.isAlive = false;
            tributes[opponentIndex].kills += 1;
            const weapon = opponent.weapons[0] || "bare hands";
            const killMessage = `${opponent.name} kills ${tribute.name} with ${weapon}.`;
            tributes[opponentIndex].events.push(killMessage);
            tribute.events.push(`Killed by ${opponent.name}.`);
          }
        }
      } else if (eventRoll < 0.6) {
        // 物品使用或受伤
        if (tribute.items.length > 0) {
          const item = tribute.items.pop();
          tribute.events.push(`${tribute.name} uses ${item}.`);
        } else {
          tribute.events.push(`${tribute.name} gets injured.`);
        }
      } else {
        // 治疗
        tribute.events.push(`${tribute.name} rests and recovers.`);
      }

      return tribute;
    });

    setTributes(updatedTributes);
  };

  const declareWinner = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length === 1) {
      setShowWinner(true);
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
    }
    dayCounter++;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!showTributeInputs && !showTributeStatus && !showDeaths && !showCornucopia && !showWinner && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-4">
              How Many Tributes?
            </h2>
            <p className="text-white/70 mb-6">
              Enter the number of tributes (2-24)
            </p>
            <p className="text-white/70 mb-6">if can't click, try to click on the blank webpage next to it.</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <input
              type="number"
              min="2"
              max="24"
              value={tributeCount || ''}
              onChange={handleTributeCountChange}
              onBlur={handleTributeCountChange} // 添加失焦事件处理
              className="bg-secondary-light border border-primary/30 rounded-lg px-4 py-2 w-32 text-center text-xl focus:outline-none focus:border-primary"
            />
            
            <button
              onClick={handleGenerate}
              disabled={!isGenerateButtonEnabled}
              className={`bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors
                ${!isGenerateButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Generate Tribute Forms ({tributeCount} tributes)
            </button>
          </div>
        </div>
      )}

      {/* Tribute Input Forms */}
      {showTributeInputs && !showTributeStatus && (
        <div className="animate-fade-in">
          <div className="grid gap-4">
            {tributes.map((tribute, index) => (
              <div key={index} className="flex items-center gap-4 bg-secondary-light p-4 rounded-lg">
                <span className="text-primary font-display w-8">
                  #{index + 1}
                </span>
                <input
                  type="text"
                  placeholder="Tribute Name"
                  value={tribute.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="flex-grow bg-secondary border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-primary"
                />
                <select 
                  value={tribute.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  className="bg-secondary border border-white/10 rounded px-3 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowTributeInputs(false)}
              className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-semibold transition-colors mr-4"
            >
              Back
            </button>
            <button 
              onClick={registerNames}
              className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Confirm Names
            </button>
          </div>
        </div>
      )}

      {/* Tribute Status Display */}
      {showTributeStatus && !showDeaths && !showCornucopia && !showWinner && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">
            Tribute Status
          </h2>
          <div className="grid gap-4">
            {tributes.map((tribute, index) => (
              <div key={index} className="flex items-center gap-4 bg-secondary-light p-4 rounded-lg">
                <span className="text-primary font-display w-8">
                  #{index + 1}
                </span>
                <div className="flex-grow">
                  <p className="text-white font-semibold">{tribute.name} ({tribute.gender})</p>
                  <p className="text-white/70">Status: {tribute.isAlive ? 'Alive' : 'Dead'}</p>
                  <p className="text-white/70">Kills: {tribute.kills}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button 
              onClick={proceedToDay}
              className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      {/* Cornucopia Events Display */}
      {showCornucopia && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">
            The Bloodbath
          </h2>
          
          <div className="grid gap-6">
            {tributes.map((tribute, index) => (
              <div key={index} className="bg-secondary-light p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-primary font-display text-2xl">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{tribute.name}</h3>
                    <p className="text-white/60">{tribute.gender}</p>
                  </div>
                </div>

                {/* 事件历史 */}
                <div className="space-y-2">
                  {tribute.events.map((event, eventIndex) => (
                    <div 
                      key={eventIndex}
                      className="px-4 py-2 bg-secondary/30 rounded text-white/80"
                    >
                      {event}
                    </div>
                  ))}
                </div>

                {/* 状态信息 */}
                <div className="mt-4 flex gap-4">
                  <span className={`px-3 py-1 rounded-full ${tribute.isAlive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {tribute.isAlive ? 'Survived' : 'Deceased'}
                  </span>
                  {tribute.kills > 0 && (
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary">
                      {tribute.kills} kills
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 继续按钮 */}
          <div className="mt-8 text-center">
            <button 
              onClick={toDeaths}
              className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
            >
              View The Fallen
            </button>
          </div>
        </div>
      )}

      {/* Deaths Display */}
      {showDeaths && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">
            The Fallen
          </h2>
          
          {/* 存活统计 */}
          <div className="mb-8 text-center">
            <p className="text-xl text-white/80">
              {tributes.filter(t => t.isAlive).length} tributes remaining
            </p>
          </div>

          {/* 死亡信息 */}
          <div className="grid gap-6">
            {tributes.filter(t => !t.isAlive).map((tribute, index) => (
              <div key={index} className="bg-secondary-light p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-primary font-display text-2xl">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{tribute.name}</h3>
                    <p className="text-white/60">{tribute.gender}</p>
                  </div>
                </div>

                {/* 击杀信息 */}
                {tribute.kills > 0 && (
                  <div className="mb-3 px-4 py-2 bg-primary/10 rounded">
                    <p className="text-white/90">
                      Kills before death: {tribute.kills}
                    </p>
                  </div>
                )}

                {/* 获得的物品 */}
                {tribute.items.length > 0 && (
                  <div className="mb-3 px-4 py-2 bg-secondary/50 rounded">
                    <p className="text-white/90">
                      Items collected: {tribute.items.join(", ")}
                    </p>
                  </div>
                )}

                {/* 获得的武器 */}
                {tribute.weapons.length > 0 && (
                  <div className="mb-3 px-4 py-2 bg-secondary/50 rounded">
                    <p className="text-white/90">
                      Weapons collected: {tribute.weapons.join(", ")}
                    </p>
                  </div>
                )}

                {/* 事件历史 */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2 text-primary/90">Event History</h4>
                  <div className="space-y-2">
                    {tribute.events.map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className="px-4 py-2 bg-secondary/30 rounded text-white/80"
                      >
                        {event}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 继续按钮 */}
          <div className="mt-8 text-center">
            <button 
              onClick={proceedToDay}
              className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Continue to Day {dayCounter + 1}
            </button>
          </div>
        </div>
      )}

      {/* Winner Display */}
      {showWinner && (
        <div className="animate-fade-in">
          <div className="bg-secondary-light p-8 rounded-lg text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-primary">
              Victory Royale
            </h2>
            
            {tributes.filter(t => t.isAlive).map(winner => (
              <div key={winner.name} className="space-y-6">
                <div className="text-3xl font-semibold mb-2">
                  {winner.name}
                </div>
                
                <div className="flex justify-center items-center gap-4">
                  <span className="px-4 py-2 bg-primary/20 rounded-full text-primary">
                    {winner.kills} Kills
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400">
                    Last One Standing
                  </span>
                </div>

                {/* 获胜者详细信息 */}
                <div className="mt-6 space-y-4">
                  {/* 收集的物品 */}
                  {winner.items.length > 0 && (
                    <div className="px-4 py-2 bg-secondary/30 rounded">
                      <h3 className="font-semibold mb-2">Collected Items</h3>
                      <p className="text-white/80">{winner.items.join(", ")}</p>
                    </div>
                  )}
                  
                  {/* 获得的武器 */}
                  {winner.weapons.length > 0 && (
                    <div className="px-4 py-2 bg-secondary/30 rounded">
                      <h3 className="font-semibold mb-2">Weapons</h3>
                      <p className="text-white/80">{winner.weapons.join(", ")}</p>
                    </div>
                  )}

                  {/* 事件历史 */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Victory Journey</h3>
                    <div className="space-y-2">
                      {winner.events.map((event, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 bg-secondary/30 rounded text-white/80"
                        >
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 游戏统计 */}
                <div className="mt-8 p-4 bg-secondary/30 rounded">
                  <h3 className="font-semibold mb-2">Game Statistics</h3>
                  <p className="text-white/80">
                    Survived for {dayCounter} days
                  </p>
                  <p className="text-white/80">
                    Defeated {tributes.length - 1} opponents
                  </p>
                </div>
              </div>
            ))}

            {/* 重新开始按钮 */}
            <div className="mt-8">
              <button 
                onClick={resetGame}
                className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Start New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 