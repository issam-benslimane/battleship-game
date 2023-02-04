import Battleship from "./app.js";
import { randomLocation } from "./helpers.js";
import { createShips } from "./ships.js";
import Board from "./state/board.js";
import Player from "./state/player.js";

let boards = [Board.random(createShips()), new Board()];
let humain = new Player({ board: boards[0] });
let robot = new Player({ board: boards[1], isAi: true });

let state = {
  status: "preparing",
  players: [humain, robot],
  turn: 0,
  current_player() {
    return this.players[this.turn % 2];
  },
  opponent() {
    return this.players.find((p) => p !== this.current_player());
  },
  wait(player) {
    if (this.status === "preparing") return player !== this.current_player();
    return player === this.current_player();
  },
};

function dispatch(state, action) {
  switch (action.type) {
    case "RANDOMIZE": {
      let players = state.players.map((p) =>
        p === state.current_player()
          ? new Player({ board: Board.random(createShips()) })
          : p
      );
      return { ...state, players };
    }

    case "ROTATE": {
      let { x, y } = action;
      let board = state.current_player().board.rotateShip({ x, y });
      let players = state.players.map((p) =>
        p === state.current_player() ? new Player({ board }) : p
      );
      return { ...state, players };
    }

    case "START": {
      let players = state.players.map((p) =>
        p !== state.current_player()
          ? new Player({ board: Board.random(createShips()), isAi: p.isAi })
          : p
      );
      let randomTurn = Math.random() < 0.5 ? state.turn : state.turn + 1;
      return { ...state, players, status: "playing", turn: randomTurn };
    }

    case "ATTACK": {
      let { x, y } = action;
      let opponent = state.opponent();
      let result = state.current_player().attack(opponent, { x, y });
      let turn = result === "hit" ? state.turn : state.turn + 1;
      if (opponent.hasLost()) return { ...state, status: "game over" };
      return { ...state, turn };
    }

    case "PLAY_AGAIN": {
      let players = [
        new Player({ board: Board.random(createShips()) }),
        new Player({ board: new Board(), isAi: true }),
      ];
      let turn = 0;
      return { ...state, players, turn, status: "preparing" };
    }
  }
}

function playAiTurn(ai, opponent) {
  return new Promise((res) => {
    setTimeout(() => {
      let location = randomLocation(ai.board.size);
      while (!opponent.board.canAttack(location)) {
        location = randomLocation(ai.board.size);
      }
      res(location);
    }, 1000);
  });
}

let app = new Battleship(state, async function update(action) {
  state = dispatch(state, action);
  app = app.syncState(state);
  document.body.append(app.dom);
  if (state.current_player().isAi) {
    let { x, y } = await playAiTurn(state.current_player(), state.opponent());
    update({ type: "ATTACK", x, y });
  }
});

document.body.append(app.dom);
