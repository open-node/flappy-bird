const Scene = require("./scene");

class Start extends Scene {
  actors = ["bg", "name", "playBtn", "bird"];

  enter() {
    this.game.actors.bg.stop = true;
    this.game.actors.bird.stop = true;
  }
}

module.exports = Start;
