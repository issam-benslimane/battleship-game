import { Vec } from "./vec.js";

export default class Cell {
  constructor(x, y, ship = null) {
    this.location = new Vec(x, y);
    this._ship = ship;
    this.attacked = false;
    this.blocked = false;
  }

  get ship() {
    return this._ship;
  }

  setShip(value) {
    let { x, y } = this.location;
    return new Cell(x, y, value);
  }

  isEmpty() {
    return this.ship == null;
  }

  top() {
    return this.location.top();
  }

  left() {
    return this.location.left();
  }

  bottom() {
    return this.location.bottom();
  }

  right() {
    return this.location.right();
  }

  adjacentCells() {
    return [this.top(), this.bottom(), this.left(), this.right()];
  }

  diagonalCells() {
    return [
      this.top().right(),
      this.bottom().right(),
      this.top().left(),
      this.bottom().left(),
    ];
  }
}
