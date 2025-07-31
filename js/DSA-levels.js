const levelData = [
  { name: "Arrays Mastery", image: "../images/arrays.png" },
  { name: "String Manipulation", image: "../images/strings.png" },
  { name: "Linked List Logic", image: "../images/linkedlist.png" },
  { name: "Stacks & Queues", image: "../images/stack.png" },
  { name: "Sorting Techniques", image: "../images/sorting.png" },
  { name: "Search Strategies", image: "../images/searching.png" },
  { name: "Tree Traversals", image: "../images/trees.png" },
  { name: "Graph Explorers", image: "../images/graphs.png" },
  { name: "Hashing Hacks", image: "../images/hashmap.png" },
  { name: "Recursive Thinking", image: "../images/recursion.png" },
  { name: "Dynamic Programming", image: "../images/dynamic-programming.png" },
  { name: "Greedy Algorithms", image: "../images/greedy-algo.png" }
];

const grid = document.getElementById("levels-grid");
const stars = JSON.parse(localStorage.getItem("stars") || "{}");
const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
const coinCountElem = document.getElementById("coin-count");

// Load coin count from localStorage or default 0
let coins = parseInt(localStorage.getItem("coins")) || 0;
coinCountElem.textContent = coins;

// Create the level cards dynamically
levelData.forEach((level, index) => {
  const levelNum = index + 1;
  const isUnlocked = levelNum <= unlockedLevel;
  const starsEarned = stars[levelNum] || 0;

  const card = document.createElement("div");
  card.className = `level-card ${isUnlocked ? "" : "locked"}`;

  if (isUnlocked) {
    card.style.cursor = "pointer";
    card.onclick = () => {
      window.location.href = `DSA-quiz-level${levelNum}.html`;
    };
  }

  const img = document.createElement("img");
  img.src = level.image;
  img.alt = level.name;
  img.className = "level-img";

  const title = document.createElement("div");
  title.className = "level-title";
  title.textContent = `Level ${levelNum}: ${level.name}`;

  const starsDiv = document.createElement("div");
  starsDiv.className = "star-container";
  for (let i = 0; i < 3; i++) {
    const star = document.createElement("span");
    star.className = "star";
    if (i < starsEarned) {
      star.textContent = "★";
      star.classList.add("filled");
    } else {
      star.textContent = "☆";
      star.classList.add("empty");
    }
    starsDiv.appendChild(star);
  }

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(starsDiv);

  if (!isUnlocked) {
    const lock = document.createElement("div");
    lock.className = "lock-icon";
    lock.textContent = "🔒";
    card.appendChild(lock);
  }

  grid.appendChild(card);
});

// Reset progress button handler
document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your progress?")) {
    localStorage.removeItem("stars");
    localStorage.setItem("unlockedLevel", "1");
    localStorage.setItem("coins", "0");  // reset coins too
    location.reload();
  }
});

// Back button handler
document.getElementById("back-btn").addEventListener("click", () => {
  window.history.back();
});

// Function to be called by quiz pages on completion
function completeLevel(levelNum, starsEarned) {
  // Store stars, only update if higher than existing
  const starData = JSON.parse(localStorage.getItem("stars") || "{}");
  if (!starData[levelNum] || starData[levelNum] < starsEarned) {
    starData[levelNum] = starsEarned;
    localStorage.setItem("stars", JSON.stringify(starData));
  }

  // Unlock next level if at least 1 star earned
  const currentUnlocked = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  if (starsEarned >= 1 && levelNum + 1 > currentUnlocked) {
    localStorage.setItem("unlockedLevel", levelNum + 1);
  }

  // Add coins for stars earned (e.g. 5 coins per star)
  if (starsEarned > 0) {
    let coins = parseInt(localStorage.getItem("coins")) || 0;
    coins += starsEarned * 10;
    localStorage.setItem("coins", coins.toString());

    // Update displayed coin count if on levels page
    const coinCountElem = document.getElementById("coin-count");
    if (coinCountElem) {
      coinCountElem.textContent = coins;
    }
  }

//   function awardCoins(stars) {
//   const coinsEarned = stars * 10;
//   let currentCoins = parseInt(localStorage.getItem("coin-count")) || 0;
//   currentCoins += coinsEarned;
//   localStorage.setItem("coin-count", currentCoins);
// }

  function completeLevel(levelNum, starsEarned) {
      let coins = parseInt(localStorage.getItem("coins")) || 0;
      coins += starsEarned * 10; // or 5, if you prefer
      localStorage.setItem("coins", coins.toString());
  }
}
