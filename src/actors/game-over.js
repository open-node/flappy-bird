const Actor = require("./actor");

class GameOver extends Actor {
  reset() {
    this.y = -48;
    this.w = 192;
    this.h = 48;
    this.maxY = 160; // 纵向最大值
    this.x = (this.game.w - this.w) >> 1;
    this.oX = 790;
    this.oY = 115;
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
  }

  update() {
    if (this.maxY <= this.y) return;
    this.y += this.v * this.g;
    this.v += 1;
  }

  render() {
    this.drawImageSlice();
  }
}

module.exports = GameOver;
