import createShip from "./ship";

const Gameboard = () => {
  // makes a 10x10 array
  // values with null
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  // ships still on the board
  let ships = [];
  const getBoard = () => board;

  // ship objects
  const randBoat = (length, name) => {
    let ship = createShip(length, name);
    return ship;
  };
  let carrier = randBoat(5, "carrier");
  let battleship = randBoat(4, "battleship");
  let cruiser = randBoat(3, "cruiser");
  let submarine = randBoat(3, "submarine");
  let destroyer = randBoat(2, "destroyer");

  // ship placing method
  const placeShip = (ship, y, x, direction) => {
    // push ships to the ship tracker
    ships.push(ship.name);

    let hullLength = ship.length;
    let xDiff = hullLength + x;
    let yDiff = hullLength + y;
    let name = ship.name;
    let success = true;
    let isPlaced = false;

    // if horizontal
    if (direction == "horizontal") {
      // check if it fits on the board
      if (xDiff > 10) {
        success = false;
        return isPlaced;
      }
      // check to see if it runs into another ship
      for (let i = 0; i < hullLength; i++) {
        if (board[y][x + i] != null) {
          success = false;
          return;
        }
      }
      // run this if it clears checks
      if (success) {
        for (let i = 0; i < hullLength; i++) {
          board[y][x + i] = name;
          success = false;
        }
        isPlaced = true;
      }
    }

    // for vertical ships
    if (direction == "vertical") {
      // check if it fits on the board
      if (yDiff > 10) {
        success = false;
        return isPlaced;
      }
      // check if we run into another ship
      for (let i = 0; i < hullLength; i++) {
        if (board[y + i][x] != null) {
          success = false;
          return;
        }
      }
      // if its successful, place the ship
      if (success) {
        for (let i = 0; i < hullLength; i++) {
          board[y + i][x] = name;
          success = false;
        }
        isPlaced = true;
      }
    }
    return isPlaced;
  };
  // taking attacks and marking ships
  const receiveAttack = (y, x) => {
    let attackPosition = board[y][x];
    let hit = true;

    // if already hit
    if (attackPosition == "hit") return undefined;
    if (attackPosition == "missed") return undefined;
    if (
      attackPosition !== null &&
      attackPosition !== "hit" &&
      attackPosition !== "missed"
    ) {
      if (attackPosition == "carrier") {
        carrier.isHit();
        carrier.isSunk(ships);
      } else if (attackPosition == "battleship") {
        battleship.isHit();
        battleship.isSunk(ships);
      } else if (attackPosition == "cruiser") {
        cruiser.isHit();
        cruiser.isSunk(ships);
      } else if (attackPosition == "submarine") {
        submarine.isHit();
        submarine.isSunk(ships);
      } else {
        destroyer.isHit();
        destroyer.isSunk(ships);
      }
      board[y][x] = "hit";
      hit = true;
      return hit;
    } else {
      board[y][x] = "missed";
      hit = false;
      return hit;
    }
  };
  // checking the board for ships
  const reportShips = () => {
    let allShipsSunk = false;
    // array is greater than 0
    if (ships.length == 0 || ships === undefined) {
      allShipsSunk = true;
      return allShipsSunk;
    }

    return allShipsSunk;
  };

  return {
    board,
    getBoard,
    ships,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
    placeShip,
    receiveAttack,
    reportShips,
  };
};

export default Gameboard;
