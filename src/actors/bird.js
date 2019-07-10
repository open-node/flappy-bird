const Actor = require("./actor");

const n = ((Math.random() * 7919) | 0) % 3;

class Bird extends Actor {
  reset() {
    this.x = (this.game.w - this.w) >> 1;
    this.y = 260;
    this.wing = 0;
    this.isDead = false; // 是否已死亡，先死往后后坠毁完毕
    this.falled = false; // 是否已坠毁
    this.v = 0; // 局部帧编号
    this.stop = false; // 是否停止动画
    this.g = 0.32; // 重力加速度
  }

  update() {
    if (this.stop) return;
    this.y += this.v * this.g;
    // 不能超过天空极限
    if (this.y < 0) this.y = 0;
    this.v += 1;

    // 落地会摔死
    if (this.game.h - 112 < this.y) {
      this.falled = true;
      // 转场进入game over
      this.game.enter("score");
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
    if (this.isDead) return;
    this.v = -20;
  }

  // game over 小鸟大头朝下坠毁
  die() {
    this.isDead = true;
    this.v = 0;
  }

  render() {
    // 坠毁后不显示了
    if (this.falled) return;
    this.game.drawImageByName(`bird_${n}_${this.wing}`, this.x, this.y);
  }
}

module.exports = Bird;
