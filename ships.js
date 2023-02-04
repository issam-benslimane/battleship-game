import Ship from "./state/ship.js";

export function createShips() {
  let carrier = new Ship({
    name: "carrier",
    length: 5,
    direction: randomLocation(),
  });
  let battleship = new Ship({
    name: "battleship",
    length: 4,
    direction: randomLocation(),
  });
  let submarine = new Ship({
    name: "submarine",
    length: 3,
    direction: randomLocation(),
  });
  let destroyer = new Ship({
    name: "destroyer",
    length: 3,
    direction: randomLocation(),
  });
  let patrolBoat = new Ship({
    name: "patrolBoat",
    length: 2,
    direction: randomLocation(),
  });
  return [carrier, battleship, submarine, destroyer, patrolBoat];
}

function randomLocation() {
  return Math.random() < 0.5 ? { x: 1, y: 0 } : { x: 0, y: 1 };
}
