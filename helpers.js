export function around() {
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

export function randomLocation(size) {
  let x = random(size);
  let y = random(size);
  return { x, y };
}

export function random(n) {
  return Math.floor(Math.random() * n);
}
