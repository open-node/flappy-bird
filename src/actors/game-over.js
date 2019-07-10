const Actor = require("./actor");

class GameOver extends Actor {
  reset() {
    this.y = -48;
    this.maxY = 160; // 纵向最大值
    this.x = (this.game.w - this.w) >> 1;
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
  }

  update() {
    if (this.maxY <= this.y) return;
    this.y += this.v * this.g;
    this.v += 1;
  }

  render() {
    this.game.drawImageByName("game_over", this.x, this.y);
  }
}

module.exports = GameOver;
