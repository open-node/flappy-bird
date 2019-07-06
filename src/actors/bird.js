const Actor = require("./actor");

class Bird extends Actor {
  reset() {
    this.y = 300;
    this.wing = 0;
    this.v = 0; // 局部帧编号
    this.stop = false; // 是否停止动画
  }

  constructor(game) {
    super(game);

    const { img } = game;
    const birds = [
      [
        [img, 175, 975, 32, 32, 164, -16, 32, 32],
        [img, 230, 650, 32, 32, 164, -16, 32, 32],
        [img, 230, 702, 32, 32, 164, -16, 32, 32]
      ]
    ];
    // 三只小鸟，随机选择一个
    const n = ((Math.random() * 7919) | 0) % birds.length;
    this.bird = birds[n];
  }

  update() {
    if (!this.stop) {
      this.y += this.v * 0.23;
      this.v += 1;
    }
    if (this.wing > 1) {
      this.wing = 0;
    } else if (this.game.fno % 7 === 0) {
      this.wing += 1;
    }
  }

  // 点击向上升起
  click() {
    if (this.stop) return;
    this.v = -20;
  }

  render() {
    const args = this.bird[this.wing];
    args[6] = this.y;
    this.game.ctx.drawImage(...args);
  }
}

module.exports = Bird;
