export class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }

  rotate() {
    return new Vec(this.y, this.x);
  }

  equals(other) {
    return this.x == other.x && this.y == other.y;
  }

  right() {
    return new Vec(this.x + 1, this.y);
  }

  left() {
    return new Vec(this.x - 1, this.y);
  }

  top() {
    return new Vec(this.x, this.y - 1);
  }

  bottom() {
    return new Vec(this.x, this.y + 1);
  }
}
