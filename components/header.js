import { elt } from "../domhelpers.js";

export class Header {
  constructor(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.dom = elt(
      "header",
      null,
      elt("h1", null, "Battleship"),
      elt(
        "div",
        null,
        this.state.status === "preparing"
          ? "Place the ships..."
          : this.state.current_player().isAi
          ? "Opponent's turn, please wait!"
          : "Your turn"
      )
    );
  }
}
