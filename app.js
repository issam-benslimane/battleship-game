import Board from "./components/board.js";
import { Header } from "./components/header.js";
import RandomizeButton from "./components/randomizeBtn.js";
import StartButton from "./components/startBtn.js";
import { elt } from "./domhelpers.js";

export default class Battleship {
  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
    this.header = new Header(state);
    this.boards = state.players.map((p) => new Board(p, state, dispatch));
    this.startButton = new StartButton(state.status, dispatch);
    this.randomizeButton = new RandomizeButton(state.status, dispatch);
    this.render();
  }

  render() {
    this.dom = elt(
      "div",
      { id: "app" },
      this.header.dom,
      elt(
        "main",
        null,
        this.startButton.dom,
        ...this.boards.map((b) => b.dom),
        this.randomizeButton.dom
      )
    );
  }

  syncState(state) {
    this.dom.remove();
    return new Battleship(state, this.dispatch);
  }
}
