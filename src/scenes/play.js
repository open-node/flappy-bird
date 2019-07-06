const Scene = require("./scene");

class Play extends Scene {
  actors = ["bg", "land", "bird"];

  enter() {
    this.game.actors.bg.stop = false;
    this.game.actors.land.stop = false;
    this.game.actors.bird.stop = false;
  }
}

module.exports = Play;
