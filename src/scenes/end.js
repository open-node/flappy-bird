const Scene = require("./scene");

class End extends Scene {
  update() {
    if (1 <= this.alpha) {
      this.alpha = 1;
    } else {
      this.alpha += 0.05;
    }
    this.game.ctx.globalAlpha = this.alpha;
    this.game.actors.bird.fall();
  }

  enter() {
    this.actors = ["bg", "land", "pipes", "bird"];
    this.alpha = 0;

    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
    this.game.actors.bird.v = 0;
    for (const x of this.game.actors.pipes) x.stop = true;
  }
}

module.exports = End;
