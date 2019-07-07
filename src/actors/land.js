const Actor = require("./actor");

class Land extends Actor {
  reset() {
    this.x = 0;
    this.y = 528;
    this.stop = true;
    this.w = 335;
    this.h = 110;
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 4;
  }

  render() {
    // 收尾详解三个切面图
    this.game.drawImageByName("land", this.x, this.y);
    this.game.drawImageByName("land", this.x + this.w, this.y);
    this.game.drawImageByName("land", this.x + this.w * 2, this.y);
  }
}

module.exports = Land;
