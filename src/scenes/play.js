const Scene = require("./scene");
const Pipe = require("../actors/pipe");

class Play extends Scene {
  actors = ["bg", "land", "pipes", "liveScore", "bird"];

  update() {
    super.update();
    const { actors, fno } = this.game;
    if (fno % 150 === 0) actors.pipes.push(new Pipe(this.game));
  }

  enter() {
    this.game.actors.bg.stop = false;
    this.game.actors.land.stop = false;
    this.game.actors.bird.stop = false;
    this.game.actors.bird.x = 80;
    this.game.actors.currScore.y = 100;
  }
}

module.exports = Play;
