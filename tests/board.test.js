import Board from "../state/board.js";
import Ship from "../state/ship.js";

let size = 10;
let board;

beforeEach(() => {
  board = new Board(size);
});

describe("cells creation", () => {
  test("should have cells property", () => {
    expect(board.cells).not.toBeUndefined();
  });
  test("should be an array", () => {
    expect(Array.isArray(board.cells)).toBeTruthy;
  });
  test("should be a (10*10) 2d array", () => {
    expect(board.cells).toHaveLength(size);
    expect(board.cells[0]).toHaveLength(size);
  });
});

describe("ship placement", () => {
  let ship_x = new Ship({ length: 3 });
  let ship_y = new Ship({ length: 3, direction: { x: 0, y: 1 } });

  describe("valid placements", () => {
    test("can be placed in board horizontally", () => {
      board.placeShip(ship_x, { x: 0, y: 0 });
      expect(board.cells[0][0]).not.toBeNull();
      expect(board.cells[0][1]).not.toBeNull();
      expect(board.cells[0][2]).not.toBeNull();
    });

    test("can be placed in board vertically", () => {
      board.placeShip(ship_y, { x: 0, y: 0 });
      expect(board.cells[0][0]).not.toBeNull();
      expect(board.cells[1][0]).not.toBeNull();
      expect(board.cells[2][0]).not.toBeNull();
    });
  });

  describe("invalid placements", () => {
    test("should not be placed if it is placed outside the board", () => {
      board.placeShip(ship_x, { x: 8, y: 0 });
      board.placeShip(ship_y, { x: 0, y: 8 });
      expect(board.cells.flat()).not.toContain(ship_x);
      expect(board.cells.flat()).not.toContain(ship_y);
    });

    test("should not be placed if another ship is diagonal", () => {
      let ship = new Ship({ length: 1 });
      board.placeShip(ship_x, { x: 1, y: 1 });
      board.placeShip(ship, { x: 0, y: 0 });
      board.placeShip(ship, { x: 0, y: 2 });
      board.placeShip(ship, { x: 2, y: 2 });
      board.placeShip(ship, { x: 2, y: 0 });
      expect(board.cells.flat()).not.toContain(ship);
    });

    test("should not be placed if another ship is adjacent", () => {
      let ship = new Ship({ length: 1 });
      board.placeShip(ship_x, { x: 1, y: 1 });
      board.placeShip(ship, { x: 1, y: 0 });
      board.placeShip(ship, { x: 0, y: 1 });
      board.placeShip(ship, { x: 4, y: 1 });
      board.placeShip(ship, { x: 1, y: 2 });
      expect(board.cells.flat()).not.toContain(ship);
    });

    test("should not be placed on top of another ship ", () => {
      let ship = new Ship({ length: 1 });
      board.placeShip(ship_x, { x: 1, y: 1 });
      board.placeShip(ship, { x: 1, y: 1 });
      board.placeShip(ship, { x: 2, y: 1 });
      board.placeShip(ship, { x: 3, y: 1 });
      console.log(board.cells);
      expect(board.cells.flat()).not.toContain(ship);
    });
  });
});
