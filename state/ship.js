export default class Ship {
  constructor({ length, direction = { x: 1, y: 0 } }) {
    this.length = length;
    this.direction = direction;
  }

  rotate() {
    Object.entries(this.direction)
      .reverse()
      .forEach(([k, v]) => (this.direction[k] = v));
  }

  equals(other_ship) {
    return this === other_ship;
  }

  locationsSet() {
    return Array.from({ length: this.length }, (_, i) => ({
      x: this.direction.x * i,
      y: this.direction.y * i,
    }));
  }
}
