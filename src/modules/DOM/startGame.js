import Players from "../players";

const checkBoard = (pBoard, cBoard) => {
  let gameCells = document.querySelectorAll(".cell");
  let winner = document.querySelector(".score");

  let checkPlayer = pBoard.reportShips();
  let checkCPU = cBoard.cBoard.reportShips();

  if (checkPlayer === true) {
    winner.innerText = "CPU sunk all Player ships!";
    // clear the event listeners on the board
    gameCells.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
  } else if (checkCPU === true) {
    winner.innerText = "Player sunk all CPU ships!";
    // clear the event listeners on the board
    gameCells.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
  }
};
const cpuAttack = (pBoard) => {
  let cells = document.querySelectorAll(".player-cell");

  let coordOne = Math.floor(Math.random() * Math.floor(10));
  let coordTwo = Math.floor(Math.random() * Math.floor(10));
  let computer = Players();
  let target = `${coordOne}${coordTwo}`;

  cells.forEach((element) => {
    if (element.id === target) {
      if (element.classList.contains("ship-located")) {
        element.classList.add("hit");
        element.classList.remove("ship-located");
      } else if (
        element.classList.contains("hit") ||
        element.classList.contains("miss")
      ) {
        cpuAttack(pBoard);
      } else {
        element.classList.add("miss");
      }
      computer.attack(pBoard, coordOne, coordTwo);
    }
  });
};
const startAttack = (e, pBoard, cBoard) => {
  let coordOne = Number(e.currentTarget.id.split("")[0]);
  let coordTwo = Number(e.currentTarget.id.split("")[1]);

  let player = Players();
  let valid = false;

  if (e.currentTarget.classList.contains("cpu-ship-located")) {
    e.currentTarget.classList.add("hit");
    e.currentTarget.classList.remove("cpu-ship-located");
    valid = true;
  } else if (
    e.currentTarget.classList.contains("miss") ||
    e.currentTarget.classList.contains("hit")
  ) {
    valid = false;
    return valid;
  } else {
    e.currentTarget.classList.add("miss");
    valid = true;
  }
  if (valid) {
    player.attack(cBoard.cBoard, coordOne, coordTwo);
    cpuAttack(pBoard);
  }
};
const addEvents = (pBoard, cBoard) => {
  let playerTable = document.querySelector(".player-table").childNodes;
  let cpuTable = document.querySelector(".cpu-table").childNodes;

  playerTable.forEach((element) => {
    element.classList.add("player-cell");
  });

  cpuTable.forEach((element) => {
    element.classList.add("cpu-cell");
    element.addEventListener("click", (e) => {
      startAttack(e, pBoard, cBoard);
      checkBoard(pBoard, cBoard);
    });
  });
};
const startGame = (pBoard, cBoard) => {
  let playerBoard = document.querySelector(".player-board");
  playerBoard.firstChild.classList.add("player-table");

  let cpuBoard = document.querySelector(".cpu-board");
  cpuBoard.firstChild.classList.add("cpu-table");
  cpuBoard.classList.remove("hidden");

  let startButton = document.getElementById("start-button");
  startButton.classList.add("hidden");

  let rotateButton = document.getElementById("rotate-button");
  rotateButton.classList.add("hidden");

  let gameCells = document.querySelectorAll(".cell");

  // clear the event listeners on the board
  gameCells.forEach((element) => {
    element.replaceWith(element.cloneNode(true));
  });

  addEvents(pBoard, cBoard);
};

export default startGame;
