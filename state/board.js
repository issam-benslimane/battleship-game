export default class Board {
  constructor(size = 10) {
    this.size = size;
    this.cells = createCells(size);
  }

  placeShip(ship, { x, y }) {
    let locations = this.cellsToFill(ship, { x, y });
    if (!this.validatePlacement(locations)) return false;
    console.log("here");
    locations.forEach((pos) => this.setCell(pos, ship));
  }

  receiveAttack(location) {}

  validatePlacement(locations) {
    return locations.every((pos) => {
      let currentCell = this.getCell(pos);
      return (
        this.inBound(pos) &&
        this.isEmpty(pos) &&
        this.cellsAround(pos)
          .map((pos) => this.getCell(pos))
          .every((cell) => cell == null || cell.equals(currentCell))
      );
    });
  }

  cellsAround({ x, y }) {
    return around()
      .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
      .filter((pos) => this.inBound(pos));
  }

  cellsToFill(ship, { x, y }) {
    return ship.locationsSet().map((set) => ({ x: set.x + x, y: set.y + y }));
  }

  setCell({ x, y }, value) {
    this.cells[y][x] = value;
  }

  getCell({ x, y }) {
    return this.cells[y] && this.cells[y][x];
  }

  isEmpty({ x, y }) {
    return this.getCell({ x, y }) == null;
  }

  inBound({ x, y }) {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }
}

function createCells(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );
}

function around() {
  return [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: -1 },
  ];
}
