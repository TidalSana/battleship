import GameBoard from "./gameboard";

const ComputerBoard = () => {
  // intialize computer's board
  let cBoard = GameBoard();
  let board = cBoard.board;

  const randomNumber = () => {
    let rando = Math.floor(Math.random() * Math.floor(10));
    return rando;
  };
  const randomDirection = () => {
    let choices = ["horizontal", "vertical"];
    let direction = choices[Math.floor(Math.random() * choices.length)];

    return direction;
  };
  const randomPlacements = (ship, orient) => {
    let placedBoat = false;

    do {
      let y = randomNumber();
      let x = randomNumber();
      placedBoat = cBoard.placeShip(ship, y, x, orient);
    } while (!placedBoat);

    return placedBoat;
  };
  const placeRandom = () => {
    let direction = randomDirection();

    let cCarrier = randomPlacements(cBoard.carrier, direction);
    let cBattleship = randomPlacements(cBoard.battleship, direction);
    let cCruiser = randomPlacements(cBoard.cruiser, direction);
    let cSubmarine = randomPlacements(cBoard.submarine, direction);
    let cDestroyer = randomPlacements(cBoard.destroyer, direction);

    return cCarrier && cBattleship && cCruiser && cSubmarine && cDestroyer;
  };

  return {
    cBoard,
    board,
    randomNumber,
    placeRandom,
  };
};

export default ComputerBoard;
