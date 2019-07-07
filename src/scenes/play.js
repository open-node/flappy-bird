const Scene = require("./scene");
const Pipe = require("../actors/pipe");

class Play extends Scene {
  update() {
    super.update();
    const { actors, fno } = this.game;
    if (fno % 150 === 0) actors.pipes.push(new Pipe(this.game));
  }

  enter() {
    this.actors = ["bg", "pipes", "land", "bird", "liveScore"];
    const { bg, land, bird, liveScore } = this.game.actors;
    bg.stop = false;
    land.stop = false;
    bird.reset();
    bird.stop = false;
    bird.x = 80;
    liveScore.y = 100;
    this.game.actors.pipes = [];
    this.game.scores.curr = 0; // 分数清零
  }
}

module.exports = Play;
