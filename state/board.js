import { randomLocation } from "../helpers.js";
import { validatePlacement } from "../validator.js";
import Cell from "./cell.js";

const SIZE = 10;
export default class Board {
  constructor(cells) {
    this.size = SIZE;
    this.cells = cells || createCells(SIZE);
  }

  static random(ships) {
    let cells = createCells(SIZE);
    for (let ship of ships) {
      let location = randomLocation(SIZE);
      let shipsLocations = ship.locations(location);
      while (!validatePlacement(cells, shipsLocations)) {
        location = randomLocation(SIZE);
        shipsLocations = ship.locations(location);
      }
      shipsLocations.forEach(
        ({ x, y }) => (cells[y][x] = cells[y][x].setShip(ship))
      );
    }
    return new Board(cells);
  }

  placeShip(ship, { x, y }) {
    let shipsLocations = ship.locations({ x, y });
    let newBoard = this.removeShip(ship, this.cells);
    if (!validatePlacement(newBoard.cells, shipsLocations)) return this;
    return newBoard.addShip(ship, shipsLocations);
  }

  receiveAttack(location) {
    let cell = this.getCell(location);
    cell.attacked = true;
    if (cell.isEmpty()) return "miss";
    cell.ship.hit();
    this.blockDiagnonalCells(cell);
    if (cell.ship.isSunk()) this.blockAdjacentCells(cell);

    return "hit";
  }

  rotateShip({ x, y }) {
    let cell = this.getCell({ x, y });
    let topCell = this.getCell(cell.top());
    let leftCell = this.getCell(cell.left());
    while (topCell && !topCell.isEmpty()) {
      cell = topCell;
      topCell = this.getCell(cell.top());
    }
    while (leftCell && !leftCell.isEmpty()) {
      cell = leftCell;
      leftCell = this.getCell(cell.left());
    }
    return this.placeShip(cell.ship.rotate(), cell.location);
  }

  shipLocations(location, visited = new Set()) {
    let cell = this.getCell(location);
    if (!cell || cell.isEmpty() || visited.has(cell)) return [];
    visited.add(cell);
    return [
      cell.location,
      ...cell
        .adjacentCells()
        .map((location) => this.shipLocations(location, visited))
        .flat(),
    ];
  }

  haveAllShipsSunk() {
    return this.cells
      .flat()
      .every((cell) => cell.isEmpty() || cell.ship.isSunk());
  }

  addShip(ship, locations) {
    let newCells = this.cells.map((row) =>
      row.map((cell) => {
        if (locations.some((location) => location.equals(cell.location))) {
          return cell.setShip(ship);
        }
        return cell;
      })
    );
    return new Board(newCells);
  }

  removeShip(ship) {
    let newCells = this.cells.map((row) =>
      row.map((cell) => (cell.ship?.equals(ship) ? cell.setShip(null) : cell))
    );
    return new Board(newCells);
  }

  getCell({ x, y }) {
    return this.inBound({ x, y }) && this.cells[y][x];
  }

  isEmpty({ x, y }) {
    return this.getCell({ x, y }).isEmpty();
  }

  canAttack({ x, y }) {
    let cell = this.getCell({ x, y });
    return cell && !cell.attacked && !cell.blocked;
  }

  inBound({ x, y }) {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }

  blockDiagnonalCells(cell) {
    cell.diagonalCells().forEach((location) => {
      let cell = this.getCell(location);
      if (cell && cell.isEmpty()) {
        cell.blocked = true;
      }
    });
  }

  blockAdjacentCells(cell) {
    let shipLocations = this.shipLocations(cell.location);
    shipLocations.forEach((location) => {
      let cell = this.getCell(location);
      cell.adjacentCells().forEach((location) => {
        let cell = this.getCell(location);
        if (cell && cell.isEmpty()) {
          cell.blocked = true;
        }
      });
    });
  }
}

function createCells(size) {
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => new Cell(x, y))
  );
}
