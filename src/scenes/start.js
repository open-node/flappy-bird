const Scene = require("./scene");

class Start extends Scene {
  enter() {
    // 角色，有层级之分，越靠后的z层级越高，会覆盖前面的
    this.actors = ["bg", "land", "name", "playBtn", "bird"];

    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
  }
}

module.exports = Start;
