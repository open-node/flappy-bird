const Scene = require("./scene");

class End extends Scene {
  enter() {
    this.actors = ["bg", "pipes", "land", "bird", "flash"];
    this.alpha = 0;

    const { bg, land, bird, pipes, flash } = this.game.actors;
    bg.stop = true;
    land.stop = true;
    flash.reset();
    bird.die();
    for (const x of pipes) x.stop = true;
  }
}

module.exports = End;
