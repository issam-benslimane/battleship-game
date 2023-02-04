export default class Player {
  constructor({ board, isAi = false }) {
    this.board = board;
    this.isAi = isAi;
  }

  attack(other_player, location) {
    return other_player.receiveAttack(location);
  }

  receiveAttack(location) {
    return this.board.receiveAttack(location);
  }

  hasLost() {
    return this.board.haveAllShipsSunk();
  }
}
