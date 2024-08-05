let coins = 0;
let coinsPerClick = 1;
let coinsPerSecond = 0;

const upgrades = {
  "art": { cost: 10, cps: 0.1, clickBonus: 0 },
  "music": { cost: 100, cps: 1, clickBonus: 0 },
  "book": { cost: 1000, cps: 10, clickBonus: 0 },
  "movie": { cost: 10000, cps: 100, clickBonus: 0 },
  "videogame": { cost: 100000, cps: 1000, clickBonus: 0 },
  "vr": { cost: 1000000, cps: 10000, clickBonus: 0 },
  "wow": { cost: 10000000, cps: 100000, clickBonus: 0 },
  "fast-finger": { cost: 10, cps: 0, clickBonus: 1 },
  "money": { cost: 1000, cps: 0, clickBonus: 10 },
  "more-money": { cost: 10000, cps: 0, clickBonus: 0, clickMultiplier: 2 },
  "more-click": { cost: 15000, cps: 0, clickBonus: 100 },
  "click-click": { cost: 100000, cps: 0, clickBonus: 0, clickMultiplier: 4 },
  "multi-tasker": { cost: 1000000, cps: 0, clickBonus: 0, cpsMultiplier: 3 },
  "hacker": { cost: 100000000, cps: 0, clickBonus: 0, cpsMultiplier: 5, clickMultiplier: 5 },
};

function clickImage() {
  coins += coinsPerClick;
  document.getElementById("coins").innerText = Math.round(coins);
  updateUpgradeColors();
}

    function buyUpgrade(upgrade, type) {
      if (coins >= upgrades[upgrade].cost) {
        coins -= upgrades[upgrade].cost;
        coinsPerSecond += upgrades[upgrade].cps;
        coinsPerClick += upgrades[upgrade].clickBonus;
        if (upgrades[upgrade].cpsMultiplier) coinsPerSecond *= upgrades[upgrade].cpsMultiplier;
        if (upgrades[upgrade].clickMultiplier) coinsPerClick *= upgrades[upgrade].clickMultiplier;
        upgrades[upgrade].cost = Math.round(upgrades[upgrade].cost * 1.05);
        if (type === 'click') {
          document.getElementById(upgrade).remove();
        } else {
            document.getElementById(upgrade).innerText = 
            upgrade.charAt(0).toUpperCase() + 
            upgrade.slice(1).replace("-", " ") + 
            " (" + 
            upgrades[upgrade].cost + 
            " coins, +" + 
            upgrades[upgrade].cps + 
            "/sec)";
        }
        updateUpgradeColors();
      }
    }

function updateUpgradeColors() {
  for (let upgrade in upgrades) {
    if (document.getElementById(upgrade)) {
      if (coins >= upgrades[upgrade].cost) {
        document.getElementById(upgrade).classList.remove("text-danger");
        document.getElementById(upgrade).classList.add("text-success");
      } else {
        document.getElementById(upgrade).classList.remove("text-success");
        document.getElementById(upgrade).classList.add("text-danger");
      }
    }
  }
}

const clickableImage = document.getElementById('clickable-image');

clickableImage.addEventListener('mousedown', () => {
  clickableImage.style.transform = 'scale(0.9)';
});

clickableImage.addEventListener('mouseup', () => {
  clickableImage.style.transform = 'scale(1)';
});

clickableImage.addEventListener('mouseleave', () => {
  clickableImage.style.transform = 'scale(1)';
});

setInterval(() => {
  coins += coinsPerSecond;
  document.getElementById("coins").innerText = Math.round(coins);
  updateUpgradeColors();
}, 1000);