import { elt } from "../domhelpers.js";

export default class Cell {
  constructor(cell, ship, player, state, dispatch) {
    this.cell = cell;
    this.ship = ship;
    this.state = state;
    this.player = player;
    this.dispatch = dispatch;
    this.render();
  }

  handleClick(ev) {
    if (this.state.wait(this.player)) return;
    let { x, y } = this.cell.location;
    if (this.state.status === "preparing") {
      if (this.cell.ship == null) return;
      this.dispatch({ type: "ROTATE", x, y });
    }
  }

  render() {
    let { x, y } = this.cell.location;
    this.dom = elt(
      "td",
      {
        "data-x": x,
        "data-y": y,
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
