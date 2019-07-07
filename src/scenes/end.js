const Scene = require("./scene");

class End extends Scene {
  update() {
    if (1 <= this.alpha) {
      this.alpha = 1;
    } else {
      this.alpha += 0.05;
    }
    this.game.ctx.globalAlpha = this.alpha;
    this.game.actors.bird.update();
  }

  enter() {
    this.actors = ["bg", "land", "pipes", "bird"];
    this.alpha = 0;

    const { bg, land, bird, pipes } = this.game.actors;
    bg.stop = true;
    land.stop = true;
    bird.die();
    for (const x of pipes) x.stop = true;
  }
}

module.exports = End;
