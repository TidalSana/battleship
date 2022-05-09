const Players = () => {
  let turn = true;

  const attack = (board, y, x) => {
    let attack = board.receiveAttack(y, x);
    turn = false;
    return attack;
  };

  return {
    get turn() {
      return turn;
    },
    set turn(value) {
      turn = value;
      return turn;
    },
    attack,
  };
};

export default Players;
