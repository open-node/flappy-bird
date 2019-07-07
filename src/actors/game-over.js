const Actor = require("./actor");

class GameOver extends Actor {
  reset() {
    this.x = 81;
    this.y = -48;
    this.w = 198;
    this.h = 48;
    this.maxY = 120; // 纵向最大值
    this.oX = 790;
    this.oY = 115;
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
  }

  constructor(game) {
    super(game);

    const { img } = game;
    const birds = [
      [
        [img, 175, 975, this.w, this.h, this.x, -16, this.w, this.h],
        [img, 230, 650, this.w, this.h, this.x, -16, this.w, this.h],
        [img, 230, 702, this.w, this.h, this.x, -16, this.w, this.h]
      ]
    ];
    // 三只小鸟，随机选择一个
    const n = ((Math.random() * 7919) | 0) % birds.length;
    this.bird = birds[n];
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
