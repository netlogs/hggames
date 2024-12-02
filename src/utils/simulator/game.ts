export function initializeGame() {
  const first = document.getElementById("start");
  const wow = document.getElementById("double");
  const press = document.getElementById("button");
  const stats = document.getElementById("stats");
  const names = document.getElementById("names");
  let mult: boolean, num: number;
  let allNames: string[] = [];
  let deathBools: boolean[] = [];
  // ... 其他变量声明
  
  // 所有函数定义
  const onClick = function() {
    // onClick 实现
  }
  
  function registerNames() {
    // registerNames 实现
  }
  
  // ... 其他函数实现
  
  // 添加事件监听器
  function initializeEventListeners() {
    press.addEventListener("click", onClick);
    document.getElementById("confirmNames")?.addEventListener("click", registerNames);
    document.getElementById("proceedOne")?.addEventListener("click", proceedToDay);
    // ... 其他事件监听器
  }
  
  // 初始化游戏
  initializeEventListeners();
}