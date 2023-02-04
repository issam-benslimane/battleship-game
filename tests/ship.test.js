import Ship from "../state/ship.js";

let ship;

beforeEach(() => {
  ship = new Ship({ length: 2, direction: { x: 1, y: 0 } });
});

test("when it is hit", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("when it is rotated", () => {
  ship = ship.rotate();
  expect(ship instanceof Ship).toBeTruthy();
  expect(ship.direction).toEqual({ x: 0, y: 1 });
});

test("when it is sunk", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy;
});

test("ship locations", () => {
  let locations = ship.locations({ x: 0, y: 0 }).map(({ x, y }) => ({ x, y }));
  expect(locations).toHaveLength(2);
  expect(locations).toContainEqual({ x: 0, y: 0 });
  expect(locations).toContainEqual({ x: 1, y: 0 });
});
