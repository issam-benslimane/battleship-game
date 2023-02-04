import { elt } from "../domhelpers.js";

export default class StartButton {
  constructor(status, dispatch) {
    this.status = status;
    this.dispatch = dispatch;
    this.render();
  }

  handleClick() {
    if (this.status === "preparing") {
      this.dispatch({ type: "START" });
    } else {
      this.dispatch({ type: "PLAY_AGAIN" });
    }
  }

  render() {
    if (this.status === "playing") return null;
    this.dom = elt(
      "button",
      { class: "start", onclick: () => this.handleClick() },
      this.status === "preparing" ? "Play" : "Play again"
    );
  }
}
