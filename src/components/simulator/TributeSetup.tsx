import { useState, useEffect } from 'react';
import TributeCountForm from './TributeCountForm';
import TributeInputForm from './TributeInputForm';
import TributeStatus from './TributeStatus';
import CornucopiaEvents from './CornucopiaEvents';
import DayEvents from './DayEvents';
import DeathsDisplay from './DeathsDisplay';
import WinnerDisplay from './WinnerDisplay';
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