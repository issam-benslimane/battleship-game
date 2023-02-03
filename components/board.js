import { elt } from "../domhelpers.js";
import Cell from "./cell.js";

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
                new Cell(cell, this.player, this.state, this.dispatch).dom
            )
          )
        )
      ),
      elt("p", null, this.player.isAi ? "Opponent's grid" : "Your grid")
    );
  }
}
