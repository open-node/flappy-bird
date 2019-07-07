const Scene = require("./scene");

class Start extends Scene {
  // 角色，有层级之分，越靠后的z层级越高，会覆盖前面的
  actors = ["bg", "land", "name", "playBtn", "bird", "liveScore"];

  enter() {
    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
    this.game.actors.liveScore.y = 260;
  }
}

module.exports = Start;
