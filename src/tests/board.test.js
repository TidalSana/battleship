import _ from "lodash";
import Gameboard from "../modules/gameboard";

describe("testing gameboard", () => {
  let gameboard = Gameboard();

  test("checking row length", () => {
    expect(gameboard.getBoard().length).toBe(10);
  });
  test("check column length", () => {
    expect(gameboard.getBoard()[0].length).toBe(10);
  });
});

describe("placing the ships horiztonally", () => {
  let gameboard = Gameboard();
  let ship1 = gameboard.carrier;
  gameboard.placeShip(ship1, 0, 0, "horizontal");

  test("place ship", () => {
    expect(gameboard.board[0][0]).toBe("carrier");
  });
});

describe("placing the ships vertically", () => {
  let gameboard = Gameboard();
  let ship1 = gameboard.carrier;
  gameboard.placeShip(ship1, 0, 0, "vertical");

  test("placing vertically", () => {
    expect(gameboard.board[0][0]).toBe("carrier");
    expect(gameboard.board[1][0]).toBe("carrier");
    expect(gameboard.board[2][0]).toBe("carrier");
    expect(gameboard.board[3][0]).toBe("carrier");
    expect(gameboard.board[4][0]).toBe("carrier");
  });
});

describe("see if ship fits horizontally", () => {
  test("checking position", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    gameboard.placeShip(ship1, 0, 6, "horizontal");
    expect(gameboard.board[0][6]).toBe(null);
  });

  test("ship's too big", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    expect(gameboard.placeShip(ship1, 6, 6, "horizontal")).toBe(false);
  });

  test("ships that fit", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    expect(gameboard.placeShip(ship1, 0, 5, "horizontal")).toBe(true);
  });
});

describe("see if ship fits vertically", () => {
  test("checking position", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    gameboard.placeShip(ship1, 5, 5, "vertical");
    expect(gameboard.board[6][5]).toBe("carrier");
  });

  test("too big vertically", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    expect(gameboard.placeShip(ship1, 6, 5, "vertical")).toBe(false);
  });

  test("ships that fit vertically", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    expect(gameboard.placeShip(ship1, 5, 6, "vertical")).toBe(true);
  });
});

describe("receiving attacks", () => {
  let gameboard = Gameboard();
  let ship1 = gameboard.carrier;
  gameboard.placeShip(ship1, 0, 0, "horizontal");

  test("attack hit", () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
  });
});

describe("missing attacks", () => {
  let gameboard = Gameboard();
  let ship1 = gameboard.carrier;
  gameboard.placeShip(ship1, 0, 0, "horizontal");

  test("attack missed", () => {
    expect(gameboard.receiveAttack(1, 0)).toBe(false);
  });
});

describe("trying to attack a hit spot", () => {
  let gameboard = Gameboard();
  let ship1 = gameboard.carrier;
  gameboard.placeShip(ship1, 0, 0, "horizontal");
  gameboard.receiveAttack(0, 0);

  test("attack already hit", () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(undefined);
  });
});

describe("reporting ships that sank", () => {
  test("all ships are sank", () => {
    let gameboard = Gameboard();
    let ship1 = gameboard.carrier;
    gameboard.placeShip(ship1, 0, 0, "horizontal");

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);
    gameboard.receiveAttack(0, 4);

    expect(gameboard.reportShips()).toBe(true);
  });

  test("not all ships sank", () => {
    let gameboard = Gameboard();

    let ship2 = gameboard.battleship;
    gameboard.placeShip(ship2, 1, 0, "vertical");

    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(3, 0);

    expect(gameboard.reportShips()).toBe(false);
  });
});
