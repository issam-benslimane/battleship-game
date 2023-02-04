import { elt } from "../domhelpers.js";

export default class RandomizeButton {
  constructor(status, dispatch) {
    this.status = status;
    this.dispatch = dispatch;
    this.render();
  }

  render() {
    if (this.status !== "preparing") return null;
    this.dom = elt(
      "button",
      {
        class: "randomize",
        onclick: () => this.dispatch({ type: "RANDOMIZE" }),
      },
      "Randomize"
    );
  }
}
