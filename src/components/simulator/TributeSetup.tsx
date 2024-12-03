import { useState, useEffect } from 'react';

// 导入必要的数组
const weapons = [
  "landmine", "bow", "melee", "paintball", "basketball",
  "octobrush", "fidget spinner", "assault rifle", "frisbee", "tank"
];

const meleeweapon = [
"sword",
"knife",
"golf club",
"baseball bat",
"stick",
"potato",
"shoe",
"dead platypus",
"65",
"diamond sword",
"dual swords",
"TI-Nspire",
"folding chair",
"steam controller",
"pear",
"war axe",
"greatsword",
"Victorian broadsword",
"shortsword",
"mace",
"bottle of vodka"
]

const itemsToFind = [
  "fruit tree",
"poisonous fruit tree",
"clean water",
"clean coal",
"clean Cole",
"OCC vending machine",
"wild Ohio Fried Chicken",
"glasses that cure color-blindness",
"bleach gummy bottle",
"paintball",
"used Band-Aid",
"clean water",
"pack of condoms",
"tent",
"biology textbook",
"bucket of KFC",
"tin of Donald Trump's bronzer",
"Emoji Movie on laserdisc",
"anthology of life-changing poems",
"quenched and tempered steel",
"VIP ticket to Tana Mojo concert",
"unicorn",
"spiritual enlightenment in a Villanova brochure",
"Lapras",
"diamond pickaxe",
"Stalin mustache",
"bone-hurting juice",
"one spaghetti",
"50% off coupon to an SAT prep class",
"indescribable object",
"chocolate-covered cotton",
"stick of Old Spice deodorant",
"freeze ray",
"findings"
];

const itemsThatGivePoints = [
"fruit tree",
"clean water",
"glasses that cure color-blindness",
"anthology of life-changing poems",
"stick of Old Spice deodorant",
"50% off coupon to an SAT prep class"
]

const causeAndEffect =
["fruit tree",
"eats fruit and gains one point in strength",
"poisonous fruit tree",
"eats a poisonous fruit",
"clean water",
"drinks clean water and gains one point in constitution",
"clean coal",
"uses coal to cook food",
"clean Cole",
"uses clean Cole as food",
"OCC vending machine",
"gets a tin of Altoids",
"wild Ohio Fried Chicken",
"random chicken",
"glasses that cure color-blindness",
"is no longer color-blind",
"bleach gummy bottle",
"eats bleach gummy bottle",
"used Band-Aid",
"random bandaid",
"pack of condoms",
"safe dating",
"tent",
"constructs a tent",
"biology textbook",
"reads a biology textbook and falls asleep",
"bucket of KFC",
"eats KFC",
"tin of Donald Trump's bronzer",
"becomes as orange as Donald Trump and dies of chemical poisoning",
"Emoji Movie on laserdisc",
"dies of pure cancer after watching the Emoji Movie",
"anthology of life-changing poems",
"\'s life gets changed by poetry",
"quenched and tempered steel",
"constructs a geometrically stable truss",
"VIP ticket to Tana Mojo concert",
"gets assaulted by a toothbrush at Tana Mojo concert",
"unicorn",
"pets the pink fluffy unicorn",
"spiritual enlightenment in a Villanova brochure",
"sees the light and adheres to the all-boy advantage",
"Agrawal star",
"jealousy",
"diamond pickaxe",
"mines diamond ore",
"bone-hurting juice",
"has major bone pain after drinking bone-hurting juice",
"Stalin mustache",
"gulag",
"one spaghetti",
"eats a singular spaghetti",
"50% off coupon to an SAT prep class",
"attends an SAT class for half the price",
"indescribable object",
"object",
"chocolate-covered cotton",
"gets indigestion from too much Egyptian cotton",
"stick of Old Spice deodorant",
"smells good, but it\'s Old Spice, not your boy\'s cologne",
"freeze ray",
"freezes",
"email",
"dies of shame after being kicked off the finance team",
"findings",
"becomes the most successful paleontologist from Vatican City"];

const killCauseAndEffect =
["landmine",
"random mine",
"bow",
"shoots",
"melee",
"kills",
"paintball",
"brings one less paintball, so",
"basketball",
"dunks on",
"octobrush",
"splats",
"fidget spinner",
"spins fidget spinner fatally at",
"assault rifle",
"shoots",
"frisbee",
"decapitates",
"tank",
"murders"];

const shelter =
["cave",
"tree",
"cardboard box",
"geometrically stable truss",
"House of the Seven Gables",
"horse carcass",
"igloo",
"Olive Garden",
"couch",
"sleeping bag",
"queen-sized bed with a memory foam mattress and furnished headrest",
"brothel"];

const cornucopia = ["run", "supply", "weapon", "battle"];

var sponsor =
["empty box",
"paintball",
"used Band-Aid",
"clean water",
"pack of condoms",
"tent",
"biology textbook",
"bucket of KFC",
"tin of Donald Trump's bronzer",
"Emoji Movie on laserdisc",
"anthology of life-changing poems",
"quenched and tempered steel",
"VIP ticket to Tana Mojo concert",
"Agrawal star",
"Lapras",
"diamond pickaxe",
"Stalin mustache",
"bone-hurting juice",
"one spaghetti",
"50% off coupon to an SAT prep class",
"indescribable object",
"chocolate-covered cotton",
"stick of Old Spice deodorant",
"freeze ray"];

var misc =
["wanders around",
"picks flowers",
"heils Hitler",
"hails Hortler",
"talks to",
"drops a rant against",
"levels up",
"sings us a song",
"is the sheriff",
"plays some pranks (GONE WRONG GONE SEXUAL)",
"realizes maverick isn't all yellow",
"loses the game",
"cries",
"has nightmares",
"stabs asparagus",
"runs out of ammunition",
"is accused of mansplaining",
"Disney star takes",
"gets doxxed by keemstar",
"hides in a river",
"hides from",
"eats",
"attaches a measuring tape to a toaster",
"gains Disney Channel flo",
"sings opera",
"blames Nelson",
"becomes a literary artist",
"complains about a test grade",
"catches 22",
"catches in the rye",
"raises the mission requirement to 65",
"tries to post a Vine",
"logs",
"changes genders",
"email",
"yells \"NikhilYA!\"",
"finds Pepe",
"finds Chuck Norris",
"puts chemicals in the water to turn the frogs gay",
"fights the Ender dragon",
"watches WatchMojo for 3 hours",
"joins the Society of Teen Suicide Prevention",
"finds Bishan Agrawal",
"barrel rolls",
"finds Dory",
"finds Nemo"];

var injury =
["gets a cold",
"gets the flu",
"gets mono",
"gets strep throat",
"loses 0.13 GPA points, and is severely injured",
"is stung by BEES",
"battles and wounds",
"sends a mass mail",
"goes deaf due to Jake Paul",
"triggered",
"gets carpal tunnel syndrome from playing osu",
"gets osteoporosis",
"gets crippling depression",
"tries to break the fourth wall",
"prank calls",
"sees things twice",
"sees things once",
"reads a disheartening message in Comic Sans",
"slips and slides on a banana peel",
"gets Hodgkin\'s Lymphoma",
"gets a bladder infection",
"gets their fingernails removed by a native tribe",
"gets devastating hiccups",
"gets yellow fever",
"gets forced into BEES",
"gets roasted by Pannapara. Slam!",
"unluckily trips despite the 1/100 chance",
"gets an ulcer",
"develops stage 4 brain cancer",
"gets necrosis",
"gets forced into fall mentorship"];

var injEffect =
["bow",
"injures",
"melee",
"injures",
"paintball",
"gets hit by a paintball shot by",
"basketball",
"gets juked by",
"octobrush",
"wounds",
"fidget spinner",
"spins fidget spinner nonfatally at",
"assault rifle",
"shoots and grazes"];

var variousDeaths =
["strangles",
"breaks",
"dies of Ebola",
"gets crushed by an unstable truss",
"forgets to get the AED for",
"gets burned to death from",
"hangs",
"decides to take a permanent nap",
"falls off a cliff while playing Pokemon Go",
"yells \"woag wiag wiag\" at",
"gets nuked from orbit by",
"chokes on crabapples in cheeks",
"forgets how to breathe",
"uses dank memes to kill",
"navy seals",
"unsafe dating",
"gets hit by a hurricane",
"falls through a portal into the blender dimension",
"loses circulation looking too good in those tight shorts",
"loses circulation looking too tight in those good shorts",
"fell into the void",
"was slain by a zombie pigman",
"withered away",
"stream",
"fatally roundhouse kicks",
"receives a bad Bishan test and dies",
"dies after a botched birthmark removal surgery",
"curses on a Christian server and gets smote",
"spontaneously combusts",
"lost connection to the server",
"coat hanger",
"falls in a well",
"dies in the Matrix",
"succumbs to lethal peer pressure from",
"accepts the Blue Whale challenge"];

var doubleDeath =
["strangles",
"forgets to get the AED for",
"gets nuked from orbit by",
"gets memed to death by",
"uses dank memes to kill",
"fatally roundhouse kicks",
"succumbs to lethal peer pressure from"];

var options =
["weapons",
"items",
"use",
"shelter",
"use",
"misc",
"injury",
"use",
"death",
"heal",
"items",
"use",
"injury",
"use"];

//var vowels = ["a","e","i","o","u"];

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
      {/* 当天事件显示区块 */}
      {showDayEvents && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">
            Day Events
          </h2>
          
          <div className="grid gap-4 mb-8">
            {dayEvents.map((event, index) => (
              <div key={index} className="bg-secondary-light p-4 rounded-lg">
                <p className="text-white">{event}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={toDeaths}
              className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-colors"
            >
              View The Fallen
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
      {showTributeStatus && !showDeaths && !showCornucopia && !showWinner && !showDayEvents && (
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

          {/* 无人死亡的情况 */}
          {tributes.filter(t => !t.isAlive).length === 0 ? (
            <div className="bg-secondary-light p-6 rounded-lg text-center">
              <p className="text-xl text-white/80">
                All tributes have survived the bloodbath!
              </p>
            </div>
          ) : (
            // 原有的死亡信息显示代码
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
          )}

          {/* 继续按钮 */}
          <div className="mt-8 text-center">
            <button 
              onClick={proceedToDay}
              className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Continue to Day {dayCounter}
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