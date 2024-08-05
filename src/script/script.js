const gameZone = document.querySelector(".boxes");
const randomSpaces = [];
let gameOverCheckCount = 1;
let scoreCount = 0;

const createBox = (x, y) => {
  const box = document.createElement("div");
  box.style.position = "absolute";
  box.id = `${x},${y}`;
  box.className = "boxArea";
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.left = `${y * 110}px`;
  box.style.top = `${x * 110}px`;
  return box;
};

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const box = createBox(i, j);
    gameZone.appendChild(box);
  }
}

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowleft") gameEngine("Left");
  if (key === "arrowright") gameEngine("Right");
  if (key === "arrowup") gameEngine("Up");
  if (key === "arrowdown") gameEngine("Down");
});

const gameEngine = (direction) => {
  const boxes = document.querySelectorAll(".box");
  let boxValues = Array.from({ length: 4 }, () => Array(4).fill(null));

  boxes.forEach((box) => {
    const [x, y] = box.id.split(",").map(Number);
    boxValues[x][y] = box;
  });

  if (direction === "Left") {
    for (let row of boxValues) {
      slideAndMerge(row);
    }
  }
  if (direction === "Right") {
    for (let row of boxValues) {
      slideAndMerge(row.reverse());
      row.reverse();
    }
  }
  if (direction === "Up") {
    for (let col = 0; col < 4; col++) {
      const column = boxValues.map((row) => row[col]);
      slideAndMerge(column);
      column.forEach((box, i) => (boxValues[i][col] = box));
    }
  }
  if (direction === "Down") {
    for (let col = 0; col < 4; col++) {
      const column = boxValues.map((row) => row[col]).reverse();
      slideAndMerge(column);
      column.reverse();
      column.forEach((box, i) => (boxValues[i][col] = box));
    }
  }

  updateBoxPositions(boxValues);
  setTimeout(() => {
    createBoxElement();
  }, 210);
};

const slideAndMerge = (line) => {
  let arr = line.filter((box) => box !== null);
  for (let i = 0; i < arr.length - 1; i++) {
    try {
      if (arr[i]?.textContent === arr[i + 1]?.textContent) {
        arr[i].textContent = parseInt(arr[i].textContent) * 2;
        arr[i + 1].parentNode.removeChild(arr[i + 1]);
        arr[i + 1] = null;
        gameOverCheckCount--;
        updateScore(arr[i].textContent);
        isWin(arr[i].textContent);
      }
    } catch (error) {
      console.log("SlideAndMerge Func Error", error);
    }
  }
  arr = arr.filter((box) => box !== null);
  while (arr.length < 4) {
    arr.push(null);
  }
  for (let i = 0; i < 4; i++) {
    line[i] = arr[i];
  }
};

const updateBoxPositions = (boxValues) => {
  boxValues.forEach((row, x) => {
    row.forEach((box, y) => {
      if (box) {
        box.id = `${x},${y}`;
        box.style.left = `${y * 110}px`;
        box.style.top = `${x * 110}px`;
      }
    });
  });
};

const isWin = (count) => {
  if (+count == 2048) {
    setTimeout(() => {
      alert("You win!");
      window.location.reload();
    }, 300);
  }
};

const updateScore = (score) => {
  scoreCount += +score;
  document.querySelector(".score").textContent = `Score : ${scoreCount}`;
};

const createBoxElement = () => {
  let emptySpaces = [];
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (!randomSpaces.includes(`${x},${y}`)) {
        emptySpaces.push([x, y]);
      }
    }
  }
  if (gameOverCheckCount > 16) {
    alert("game over!");
    window.location.reload();
  }

  let x = Math.floor(Math.random() * 4);
  let y = Math.floor(Math.random() * 4);
  randomSpaces.push(`${x},${y}`);
  const box = document.createElement("div");
  box.className = "box";
  box.id = `${x},${y}`;
  box.textContent = "2";
  box.style.left = `${y * 110}px`;
  box.style.top = `${x * 110}px`;
  gameZone.appendChild(box);
  box.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 999
  )},${Math.floor(Math.random() * 999)},${Math.floor(Math.random() * 999)})`;
  gameOverCheckCount++;
};

createBoxElement();
createBoxElement();
