import { Vec } from "./vec.js";

export default class Ship {
  constructor({ name, length, direction = { x: 1, y: 0 } }) {
    this.name = name;
    this.length = length;
    this.direction = new Vec(direction.x, direction.y);
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }

  rotate() {
    return new Ship({
      name: this.name,
      length: this.length,
      direction: this.direction.rotate(),
    });
  }

  equals(other_ship) {
    return this.name === other_ship.name;
  }

  locations({ x, y }) {
    let location = new Vec(x, y);
    return Array.from({ length: this.length }, (_, i) =>
      this.direction.times(i).plus(location)
    );
  }
}
