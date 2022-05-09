const setupGrid = (board) => {
  let gameCells = Array.from(document.querySelectorAll(".cell"));
  let rotate = document.querySelector("#rotate-button");
  let ship = board.carrier;
  let direction = "horizontal";

  rotate.addEventListener("click", () => {
    if (direction === "horizontal") {
      direction = "vertical";
    } else {
      direction = "horizontal";
    }
  });

  for (let i = 0; i < gameCells.length; i++) {
    let cells = gameCells[i];
    let paragraph = document.querySelector(".score");

    const addShip = (e) => {
      e.stopImmediatePropagation();
      let coordOne = Number(cells.id.split("")[0]);
      let coordTwo = Number(cells.id.split("")[1]);
      let targetId = parseInt(coordTwo);
      let valid = true;

      if (ship === null) return;
      let directDiff = ship.length + targetId;

      if (direction === "horizontal") {
        if (directDiff > 10) {
          valid = false;
          return;
        }

        for (let j = 0; j < ship.length; j++) {
          let target = document.getElementById(`${coordOne}${targetId + j}`);

          if (target.classList.contains("ship-located")) {
            valid = false;
            break;
          } else {
            valid = true;
            target.className = "cell ship-located";
          }
        }

        if (valid) {
          board.placeShip(ship, coordOne, coordTwo, direction);
          if (ship === board.carrier) {
            ship = board.battleship;
            paragraph.innerText = "Place your battleship";
          } else if (ship === board.battleship) {
            ship = board.cruiser;
            paragraph.innerText = "Place your cruiser";
          } else if (ship === board.cruiser) {
            ship = board.submarine;
            paragraph.innerText = "Place your submarine";
          } else if (ship === board.submarine) {
            ship = board.destroyer;
            paragraph.innerText = "Place your destroyer";
          } else if (ship === board.destroyer) {
            ship = null;
            paragraph.innerText = "Click 'start' to begin";
            let startButton = document.querySelector("#start-button");
            startButton.classList.remove("hidden");
            return ship;
          }
        }
      }

      if (direction === "vertical") {
        directDiff = ship.length + coordOne;
        if (directDiff > 10) {
          valid = false;
          return;
        }

        for (let j = 0; j < ship.length; j++) {
          let target = document.getElementById(`${coordOne + j}${targetId}`);

          if (target.classList.contains("ship-located")) {
            valid = false;
            break;
          } else {
            valid = true;
            target.className = "cell ship-located";
          }
        }

        if (valid) {
          board.placeShip(ship, coordOne, coordTwo, direction);
          if (ship === board.carrier) {
            ship = board.battleship;
          } else if (ship === board.battleship) {
            ship = board.cruiser;
          } else if (ship === board.cruiser) {
            ship = board.submarine;
          } else if (ship === board.submarine) {
            ship = board.destroyer;
          } else if (ship === board.destroyer) {
            valid = false;
            ship = null;
            let startButton = document.querySelector("#start-button");
            startButton.classList.remove("hidden");
            return valid;
          }
        }
      }
    };
    const hoverShips = (e) => {
      let coordOne = Number(cells.id.split("")[0]);
      let coordTwo = Number(cells.id.split("")[1]);
      let targetId = parseInt(coordTwo);

      if (ship === null) return;
      let directDiff = ship.length + targetId;

      if (direction === "horizontal") {
        if (directDiff > 10 && !e.target.classList.contains("ship-located")) {
          e.target.className = "not-allowed";
          return;
        }

        for (let j = 0; j < ship.length; j++) {
          let target = document.getElementById(`${coordOne}${targetId + j}`);

          if (target.classList.contains("ship-located")) {
            break;
          } else {
            target.className = "hover-cell";
          }
        }
      }

      if (direction === "vertical") {
        directDiff = ship.length + coordOne;
        if (directDiff > 10 && !e.target.classList.contains("ship-located")) {
          e.target.className = "not-allowed";
          return;
        }

        for (let j = 0; j < ship.length; j++) {
          let target = document.getElementById(`${coordOne + j}${targetId}`);

          if (target.classList.contains("ship-located")) {
            break;
          } else {
            target.className = "hover-cell";
          }
        }
      }
    };
    const leavingCell = (e) => {
      e.stopImmediatePropagation();
      let hoveredCells = document.querySelectorAll(".hover-cell");
      let notAllowed = document.querySelectorAll(".not-allowed");

      hoveredCells.forEach((target) => {
        target.className = "cell";
      });

      notAllowed.forEach((target) => {
        target.className = "cell";
      });
    };

    cells.addEventListener("click", addShip);

    cells.addEventListener("mouseover", hoverShips);

    cells.addEventListener("mouseleave", leavingCell);
  }
};

export default setupGrid;
