import { elt } from "../domhelpers.js";

export default class StartButton {
  constructor(status, dispatch) {
    this.status = status;
    this.dispatch = dispatch;
    this.render();
  }

  render() {
    if (this.status === "playing") return null;
    this.dom = elt(
      "button",
      { class: "start", onclick: () => this.dispatch({ type: "START" }) },
      "Play"
    );
  }
}
