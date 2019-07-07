const Actor = require("./actor");

class ScoreCard extends Actor {
  reset() {
    this.x = 64;
    this.w = 232;
    this.h = 118;
    this.y = this.game.h + this.h;
    this.minY = 260; // 纵向最大值
    this.oX = 0;
    this.oY = 518;
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
    this.isNew = false; // 是否是新纪录
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
    if (this.y <= this.minY) return;
    this.y -= this.v * this.g;
    this.v += 1;
  }

  render() {
    this.drawImageSlice();
    this.game.drawImageByName(`medal_${this.ranking}`, this.x + 32, this.y + 45);
  }
}

module.exports = ScoreCard;
