const Scene = require("./scene");

class Score extends Scene {
  actors = ["bg", "land", "pipes", "gameOver", "currScore"];
  alpha = 0;

  enter() {
    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
    this.game.actors.bird.v = 0;
    for (const x of this.game.actors.pipes) x.stop = true;
  }
}

module.exports = Score;
