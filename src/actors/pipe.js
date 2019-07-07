const Actor = require("./actor");

class Pipe extends Actor {
  reset() {
    this.gap = 200;
    const { img } = this.game;
    this.uH = (10 + Math.random() * 300) | 0; // 上管道高度, 高度在20 ~ 100 之间随机
    this.dH = 640 - 112 - this.gap - this.uH; // 下管道高度
    this.x = 360;
    this.y = 528;
    this.stop = false;
    this.w = 52;
    this.h = 326;
    this.up = [img, 112, 640 + this.h - this.uH, this.w, this.uH, this.x, 0, this.w, this.uH];
    this.down = [img, 168, 640, this.w, this.dH, this.x, this.uH + this.gap, this.w, this.dH];
    this.passed = false;
  }

  update(collection) {
    if (this.stop) return;
    this.x -= 4;
    // 碰撞检测
    const { bird } = this.game.actors;
    // 分别检测上管道和下管道
    // 因为管道分两部分，因此以鸟为中心分别检测两次, 这样算法是通用的基类提供的算法
    if (bird.aabb(this.x, 0, this.w, this.uH) || bird.aabb(this.x, this.uH + this.gap, this.w, this.dH)) {
      // game over
      return this.game.enter("end");
    }

    // 检测是否小鸟越过
    if (!this.passed && this.x + this.w < bird.x) {
      this.game.scores.curr += 1;
      this.passed = true;
    }

    // 判断是否出界，出界从队列移除
    if (collection && this.isOut) {
      const index = collection.indexOf(this);
      if (-1 < index) collection.splice(index, 1);
    }
  }

  render() {
    const { ctx, img } = this.game;
    this.up[5] = this.x;
    this.down[5] = this.x;

    ctx.drawImage(...this.up);
    ctx.drawImage(...this.down);
  }
}

module.exports = Pipe;
