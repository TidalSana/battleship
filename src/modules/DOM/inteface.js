import Gameboard from "../gameboard";
import "../../styles/style.css";
import ComputerBoard from "../ai";
import setupGrid from "./setupGrid";
import startGame from "./startGame";

const createHeader = () => {
  let header = document.createElement("header");
  let title = document.createElement("h1");
  header.classList.add("header");
  header.appendChild(title);

  title.innerText = "Battleship";

  return header;
};
const createDiv = (identifier, name) => {
  let div = document.createElement("div");
  div.classList.add(name);
  div.id = identifier;

  return div;
};
const createP = (name, text) => {
  let head = document.createElement("h2");
  head.classList.add(name);
  head.innerText = text;

  return head;
};
const createButtons = (identifier, name, inner) => {
  let button = document.createElement("button");
  button.classList.add(name);
  button.id = identifier;
  button.innerText = inner;

  return button;
};
const createTable = (array) => {
  let content = document.querySelector(".content");

  let table = document.createElement("div");
  table.classList.add("table");
  let tableBody = document.createElement("div");
  tableBody.classList.add("table-body");

  // loop over the rows
  for (let i = 0; i < array.length; i++) {
    let row = array[i];
    // loop over the inside of the rows
    for (let j = 0; j < row.length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i}${j}`;
      if (array[i][j] != null) {
        cell.classList.add("cpu-ship-located");
      }

      tableBody.appendChild(cell);
    }
  }
  table.appendChild(tableBody);
  content.appendChild(table);

  return table;
};
const createFooter = (identifier, name, inner) => {
  let footer = document.createElement("footer");
  footer.classList.add(name);
  footer.id = identifier;

  let paragraph = document.createElement("p");
  paragraph.classList.add("footer-text");
  paragraph.innerHTML = inner;

  footer.appendChild(paragraph);

  return footer;
};
const createInterface = () => {
  let content = document.querySelector(".content");
  content.innerHTML = "";

  let player = Gameboard();
  let cpu = ComputerBoard();

  cpu.placeRandom();

  let header = createHeader();
  let startButton = createButtons("start-button", "game-buttons", "Start");
  startButton.classList.add("hidden");
  let contextDiv = createDiv("context-div", "div");
  let contextParagraph = createP("score", "Place your carrier");
  contextDiv.appendChild(contextParagraph);
  let boards = createDiv("game-board", "boards");

  let playerBoard = createTable(player.board);
  playerBoard.classList.add("player-board");
  boards.appendChild(playerBoard);

  let rotateButton = createButtons("rotate-button", "game-buttons", "Rotate");
  playerBoard.appendChild(rotateButton);

  let cpuBoard = createTable(cpu.board);
  cpuBoard.classList.add("cpu-board");
  cpuBoard.classList.add("hidden");
  boards.appendChild(cpuBoard);

  let restart = createButtons("reset-button", "game-buttons", "Reset Board");
  restart.classList.add("hidden");

  let footer = createFooter(
    "footer",
    "footer-div",
    `Made by <a class="link" href="https://github.com/TidalSana" target="_blank">
  <i class="fa-brands fa-github"></i>TidalSana</a>.2022.`
  );

  content.appendChild(header);
  content.appendChild(startButton);
  content.appendChild(contextDiv);
  content.appendChild(boards);
  content.appendChild(restart);

  document.body.appendChild(footer);

  setupGrid(player);

  startButton.addEventListener("click", () => {
    startGame(player, cpu);
    restart.classList.remove("hidden");
    contextParagraph.innerText = "";
  });

  restart.addEventListener("click", () => {
    createInterface();
  });
};

export default createInterface;
