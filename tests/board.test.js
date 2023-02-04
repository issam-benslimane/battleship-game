import { createShips } from "../ships.js";
import Board from "../state/board.js";
import Ship from "../state/ship.js";

const SIZE = 10;
let board;

beforeEach(() => {
  board = new Board();
});

describe("cells creation", () => {
  test("should have cells property", () => {
    expect(board.cells).not.toBeUndefined();
  });
  test("should be an array", () => {
    expect(Array.isArray(board.cells)).toBeTruthy();
  });
  test("should be a (10*10) 2d array", () => {
    expect(board.cells).toHaveLength(SIZE);
    expect(board.cells[0]).toHaveLength(SIZE);
  });
});

describe("ship placement", () => {
  let ship_x = new Ship({ name: "x", length: 3 });
  let ship_y = new Ship({ name: "y", length: 3, direction: { x: 0, y: 1 } });

  describe("valid ship placements", () => {
    test("should return a new board instance", () => {
      let newBoard = board.placeShip(ship_x, { x: 0, y: 0 });
      expect(newBoard).not.toEqual(board);
    });

    test("can be placed in board horizontally", () => {
      board = board.placeShip(ship_x, { x: 0, y: 0 });
      expect(board.cells[0][0].ship).not.toBeNull();
      expect(board.cells[0][1].ship).not.toBeNull();
      expect(board.cells[0][2].ship).not.toBeNull();
    });

    test("can be placed in board vertically", () => {
      board = board.placeShip(ship_y, { x: 0, y: 0 });
      expect(board.cells[0][0].ship).not.toBeNull();
      expect(board.cells[1][0].ship).not.toBeNull();
      expect(board.cells[2][0].ship).not.toBeNull();
    });

    test("is removed from board if it's moved", () => {
      board = board.placeShip(ship_x, { x: 0, y: 0 });
      board = board.placeShip(ship_x, { x: 5, y: 0 });
      expect(board.cells[0][0].ship).toBeNull();
    });
  });

  describe("invalid placements", () => {
    test("should return the board", () => {
      let newBoard = board.placeShip(ship_x, { x: 8, y: 0 });
      expect(newBoard).toEqual(board);
    });

    test("should not be placed if it is placed outside the board", () => {
      board = board.placeShip(ship_x, { x: 8, y: 0 });
      board = board.placeShip(ship_y, { x: 0, y: 8 });
      expect(board.cells.flat()).not.toContain(ship_x);
      expect(board.cells.flat()).not.toContain(ship_y);
    });

    test("should not be placed if another ship is diagonal", () => {
      let ship = new Ship({ name: "z", length: 1 });
      board = board.placeShip(ship_x, { x: 1, y: 1 });
      board = board.placeShip(ship, { x: 0, y: 0 });
      board = board.placeShip(ship, { x: 0, y: 2 });
      board = board.placeShip(ship, { x: 2, y: 2 });
      board = board.placeShip(ship, { x: 2, y: 0 });
      expect(board.cells.flat()).not.toContain(ship);
    });

    test("should not be placed if another ship is adjacent", () => {
      let ship = new Ship({ name: "z", length: 1 });
      board = board.placeShip(ship_x, { x: 1, y: 1 });
      board = board.placeShip(ship, { x: 1, y: 0 });
      board = board.placeShip(ship, { x: 0, y: 1 });
      board = board.placeShip(ship, { x: 4, y: 1 });
      board = board.placeShip(ship, { x: 1, y: 2 });
      expect(board.cells.flat()).not.toContain(ship);
    });

    test("should not be placed on top of another ship ", () => {
      let ship = new Ship({ name: "z", length: 1 });
      board = board.placeShip(ship_x, { x: 1, y: 1 });
      board = board.placeShip(ship, { x: 1, y: 1 });
      board = board.placeShip(ship, { x: 2, y: 1 });
      board = board.placeShip(ship, { x: 3, y: 1 });
      expect(board.cells.flat()).not.toContain(ship);
    });
  });
});

describe("ship rotation", () => {
  let ship = new Ship({ name: "x", length: 3 });
  test("when rotation is possible", () => {
    let newBoard = board
      .placeShip(ship, { x: 0, y: 0 })
      .rotateShip({ x: 0, y: 0 });
    expect(newBoard).not.toEqual(board);
    expect(newBoard.cells[1][0].isEmpty()).toBeFalsy();
    expect(newBoard.cells[0][1].isEmpty()).toBeTruthy();
  });
  test("when rotation is not possible", () => {
    board = board.placeShip(ship, { x: 0, y: 8 });
    let newBoard = board.rotateShip({ x: 0, y: 8 });
    expect(newBoard).toEqual(board);
  });
});

describe("random ships placements", () => {
  let ships = createShips();
  let board = Board.random(ships);
  expect(board instanceof Board).toBeTruthy();
  ships.forEach((ship) =>
    expect(board.cells.flat().some((cell) => cell.ship === ship)).toBeTruthy()
  );
});

describe("ship positions", () => {
  test("when cell is empty", () => {
    let positions = board.shipLocations({ x: 0, y: 0 });
    expect(Array.isArray(positions)).toBeTruthy();
    expect(positions).toHaveLength(0);
  });
  test("when board have ships", () => {
    let ship = new Ship({ name: "x", length: 4 });
    board = board.placeShip(ship, { x: 0, y: 0 });
    let positions = board.shipLocations({ x: 2, y: 0 });
    console.log(positions);
    expect(positions).toHaveLength(4);
    expect(positions).toContainEqual({ x: 0, y: 0 });
    expect(positions).toContainEqual({ x: 1, y: 0 });
    expect(positions).toContainEqual({ x: 2, y: 0 });
    expect(positions).toContainEqual({ x: 3, y: 0 });
  });
});

describe("board attacked", () => {
  let ship = new Ship({ name: "x", length: 1 });
  test("when missed", () => {
    board = board.placeShip(ship, { x: 0, y: 0 });
    expect(board.receiveAttack({ x: 0, y: 0 })).toBe("hit");
  });

  test("when hit", () => {
    board = board.placeShip(ship, { x: 0, y: 0 });
    expect(board.receiveAttack({ x: 1, y: 0 })).toBe("miss");
  });
});

describe("all ships sunk", () => {
  let ship = new Ship({ name: "x", length: 1 });
  test("when a ship is not sunk yet", () => {
    board = board.placeShip(ship, { x: 0, y: 0 });
    expect(board.haveAllShipsSunk()).toBeFalsy();
  });

  test("when all ships are sunk", () => {
    board = board.placeShip(ship, { x: 0, y: 0 });
    board.receiveAttack({ x: 0, y: 0 });
    expect(board.haveAllShipsSunk()).toBeTruthy();
  });
});
