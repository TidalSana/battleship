import Players from "../modules/players";
import Gameboard from "../modules/gameboard";
import ComputerBoard from "../modules/ai";

describe("attacking", () => {
  let pBoard = Gameboard();
  let computer = Players();

  let carrier = pBoard.placeShip(pBoard.carrier, 0, 0, "horizontal");
  let battleship = pBoard.placeShip(pBoard.battleship, 2, 6, "horizontal");
  let cruiser = pBoard.placeShip(pBoard.cruiser, 3, 0, "horizontal");
  let submarine = pBoard.placeShip(pBoard.submarine, 5, 0, "horizontal");
  let destroyer = pBoard.placeShip(pBoard.destroyer, 7, 0, "horizontal");

  test("missed", () => {
    expect(computer.attack(pBoard, 9, 3)).toBe(false);
  });
  test("already hit", () => {
    computer.attack(pBoard, 9, 3);
    expect(computer.attack(pBoard, 9, 3)).toBe(undefined);
  });
  test("hit", () => {
    expect(computer.attack(pBoard, 0, 1)).toBe(true);
  });
});
describe("taking turns", () => {
  // initialize boards
  let pBoard = Gameboard();
  let cBoard = Gameboard();

  // placing player ships
  let carrier = pBoard.placeShip(pBoard.carrier, 0, 0, "horizontal");
  let battleship = pBoard.placeShip(pBoard.battleship, 2, 6, "horizontal");
  let cruiser = pBoard.placeShip(pBoard.cruiser, 3, 0, "horizontal");
  let submarine = pBoard.placeShip(pBoard.submarine, 5, 0, "horizontal");
  let destroyer = pBoard.placeShip(pBoard.destroyer, 7, 0, "horizontal");

  // placing computer ships
  let cCarrier = cBoard.placeShip(cBoard.carrier, 0, 0, "horizontal");
  let cBattleship = cBoard.placeShip(cBoard.battleship, 2, 6, "horizontal");
  let cCruiser = cBoard.placeShip(cBoard.cruiser, 3, 0, "horizontal");
  let cSubmarine = cBoard.placeShip(cBoard.submarine, 5, 0, "horizontal");
  let cDestroyer = cBoard.placeShip(cBoard.destroyer, 7, 0, "horizontal");

  // attack methods
  let player = Players();
  let computer = Players();

  test("CPU turn", () => {
    player.attack(cBoard, 0, 0);

    expect(player.turn).toBe(false);
    expect(computer.turn).toBe(true);
  });
  test("Player turn", () => {
    player.attack(cBoard, 0, 0);
    computer.attack(pBoard, 0, 0);

    player.turn = true;

    expect(player.turn).toBe(true);
    expect(computer.turn).toBe(false);
  });
});
