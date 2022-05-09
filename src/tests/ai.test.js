import ComputerBoard from "../modules/ai";

describe("ai ship placements", () => {
  let computer = ComputerBoard();

  test("places all the ships on the board", () => {
    expect(computer.placeRandom()).toBe(true);
  });
});
