import GameBoard from "../modules/gameboard";

describe("testing ship properties", () => {
  let gameboard = GameBoard();
  let ship1 = gameboard.carrier;
  test("has a length", () => {
    expect(ship1.length).toBe(5);
  });
  test("makes hull or grid for the ship", () => {
    expect(ship1.hull).toEqual([0, 1, 2, 3, 4]);
  });
  test("position clicked equals a hit on ship", () => {
    ship1.isHit();
    expect(ship1.hull[0]).toEqual("hit");
  });
  test("ship is sunk", () => {
    let gameboard = GameBoard();
    ship1.isHit();
    ship1.isHit();
    ship1.isHit();
    ship1.isHit();
    ship1.isHit();
    expect(ship1.isSunk(gameboard)).toBe(false);
  });
});
