const Scene = require("./scene");

class Tour extends Scene {
  render() {
    super.render();
    this.game.drawImageAlignCenterByName("ready", 180);
    this.game.drawImageAlignCenterByName("tour", 230);
  }

  enter() {
    this.actors = ["bg", "land", "bird", "liveScore"];
    this.game.actors.bird.reset();
    this.game.actors.bird.stop = true;
    this.game.actors.bird.x = 80;
    this.game.scores.curr = 0;
    this.game.registCallback(120, () => this.game.enter("play"));
  }
}

module.exports = Tour;
