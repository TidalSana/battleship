import _ from "lodash";

const createShip = (len, ship) => {
  let length = len;
  let name = ship;
  let hull = [...Array(len).keys()];

  // checking position clicked
  const isHit = () => {
    for (let i = 0; i < hull.length; i++) {
      // if hull is not hit
      // mark it hit then exit loop
      if (hull[i] != "hit") {
        hull[i] = "hit";
        break;
      }
      if (hull[i] == "hit") {
        continue;
      }
    }
  };

  // gets ship from the array
  // then removes them from array
  const getShip = (board) => {
    _.pull(board, name);
  };

  // checks if ship is sunk
  const isSunk = (array) => {
    let alive = true;
    // return true if value is equal to "hit"
    let checking = (value) => value == "hit";

    // if hull tiles matches "hit"
    // ships are sunk
    if (hull.every(checking)) {
      getShip(array);
      alive = false;
      return alive;
      // ships are alive
    } else {
      alive = true;
      return alive;
    }
  };

  return {
    length,
    name,
    hull,
    isHit,
    isSunk,
  };
};

export default createShip;
