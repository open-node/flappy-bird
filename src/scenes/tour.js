const Scene = require("./scene");

class Tour extends Scene {
  render() {
    super.render();
    this.game.drawImageByName("ready", 83, 180);
    this.game.drawImageByName("tour", 120, 230);
  }

  enter() {
    this.actors = ["bg", "land", "bird", "liveScore"];
    this.game.actors.bird.x = 80;
    setTimeout(() => this.game.enter("play"), 3000);
  }
}

module.exports = Tour;
