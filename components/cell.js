import { elt } from "../domhelpers.js";

export default class Cell {
  constructor(cell, player, state, dispatch) {
    this.cell = cell;
    this.state = state;
    this.player = player;
    this.shipLocations = player.board.shipLocations(cell.location);
    this.dispatch = dispatch;
    this.render();
  }

  isEmpty() {
    return this.cell.isEmpty();
  }

  handleClick(ev) {
    if (this.state.wait(this.player) || this.cell.attacked || this.cell.blocked)
      return;
    let { x, y } = this.cell.location;
    if (this.state.status === "preparing") {
      if (this.cell.ship == null) return;
      this.dispatch({ type: "ROTATE", x, y });
    } else {
      this.dispatch({ type: "ATTACK", x, y });
    }
  }

  render() {
    let { x, y } = this.cell.location;
    this.dom = elt(
      "td",
      {
        "data-x": x,
        "data-y": y,
        class: this.isEmpty()
          ? createEmptyCell(this.cell)
          : createShipCell(this.cell, this.shipLocations),
        onclick: (ev) => this.handleClick(ev),
      },
      createColMarker(x, y),
      createRowMarker(x, y),
      this.ship
    );
  }
}

function createColMarker(x, y) {
  if (y > 0) return null;
  const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let marker = COLUMNS.find((_, i) => i === x);
  return elt("div", { class: "marker marker--x" }, elt("span", null, marker));
}

function createRowMarker(x, y) {
  if (x > 0) return null;
  const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let marker = ROWS.find((_, i) => i === y);
  return elt(
    "div",
    { class: "marker marker--y" },
    elt("span", null, marker.toString())
  );
}

function createShipCell(cell, locations) {
  let className = "ship";
  for (let vec of locations) {
    if (cell.location.right().equals(vec)) className += " br-0";
    if (cell.location.left().equals(vec)) className += " bl-0";
    if (cell.location.top().equals(vec)) className += " bt-0";
    if (cell.location.bottom().equals(vec)) className += " bb-0";
    if (cell.attacked) className += " ship--red";
  }
  return className;
}

function createEmptyCell(cell) {
  let className = "cell";
  if (cell.attacked) className += " cell--attacked";
  if (cell.blocked) className += " cell--blocked";
  return className;
}
