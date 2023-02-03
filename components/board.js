import { elt } from "../domhelpers.js";
import Cell from "./cell.js";
import { Vec } from "../state/vec.js";

const scale = 35;

export default class Board {
  constructor(player, state, dispatch) {
    this.player = player;
    this.state = state;
    this.dispatch = dispatch;
    this.render();
  }

  render() {
    let cells = this.player.board.cells;
    let shipsLocations = this.player.board.shipsLocations();
    let className = this.state.wait(this.player)
      ? "board board--wait"
      : "board";
    this.dom = elt(
      "div",
      { class: className },
      elt(
        "table",
        { style: `width: ${cells.length * scale}px` },
        ...cells.map((row) =>
          elt(
            "tr",
            { style: `height: ${scale}px` },
            ...row.map(
              (cell) =>
                new Cell(
                  cell,
                  createShip(cell, shipsLocations),
                  this.player,
                  this.state,
                  this.dispatch
                ).dom
            )
          )
        )
      ),
      elt("p", null, this.player.isAi ? "Opponent's grid" : "Your grid")
    );
  }
}

function createShip(cell, locations) {
  if (cell.isEmpty()) return null;
  let className = "ship";
  for (let { x, y } of locations) {
    let vec = new Vec(x, y);
    if (cell.location.right().equals(vec)) className += " br-0";
    if (cell.location.left().equals(vec)) className += " bl-0";
    if (cell.location.top().equals(vec)) className += " bt-0";
    if (cell.location.bottom().equals(vec)) className += " bb-0";
  }
  return elt("div", { class: className });
}
