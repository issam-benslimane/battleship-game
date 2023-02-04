export function validatePlacement(cells, shipLocations) {
  for (let { x, y } of shipLocations) {
    let current_cell = cells[y] && cells[y][x];
    if (!current_cell || !current_cell.isEmpty()) return false;
    for (let { x, y } of cellsAround(current_cell)) {
      let cell = cells[y] && cells[y][x];
      if (cell && !cell.isEmpty()) return false;
    }
  }
  return true;
}

function cellsAround(cell) {
  let adjacent = cell.adjacentCells();
  let diagonal = cell.diagonalCells();
  return adjacent.concat(diagonal);
}
