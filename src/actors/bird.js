const Actor = require("./actor");

class Bird extends Actor {
  reset() {
    this.x = 164;
    this.y = 300;
    this.w = 32;
    this.h = 32;
    this.wing = 0;
    this.falled = false; // 是否已坠毁
    this.v = 0; // 局部帧编号
    this.stop = false; // 是否停止动画
    this.g = 0.23; // 重力加速度
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
    if (this.stop) return;
    this.y += this.v * this.g;
    // 不能超过天空极限
    if (this.y < 0) this.y = 0;
    this.v += 1;

    // 落地会摔死
    if (this.game.h - 112 < this.y) {
      // 转场进入game over
      this.game.enter("end");
    }

    // 降落不用煽动翅膀
    if (this.v < 0) {
      if (this.wing > 1) {
        this.wing = 0;
      } else if (this.game.fno % 7 === 0) {
        this.wing += 1;
      }
    }
  }

  // 点击向上升起
  click() {
    if (this.stop) return;
    this.v = -20;
  }

  // game over 小鸟大头朝下坠毁
  fall() {
    if (this.falled) return;
    if (this.game.h - 112 < this.y) this.falled = true;
    this.y += this.v * this.g;
    this.v += 1;
  }

  render() {
    const args = this.bird[this.wing];
    args[5] = this.x;
    args[6] = this.y;
    this.game.ctx.drawImage(...args);
  }
}

module.exports = Bird;
