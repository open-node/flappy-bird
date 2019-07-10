const Actor = require("./actor");

class Pipe extends Actor {
  reset() {
    this.gap = 240; // 上下管道之间的缝隙
    this.uH = 40 + ((Math.random() * 300) | 0); // 上管道高度, 高度在40 ~ 340 之间随机
    this.dH = this.game.h - this.game.actors.land.h - this.gap - this.uH; // 下管道高度
    this.x = this.game.w;
    this.stop = false;
    this.passed = false;
  }

  update(collection) {
    if (this.stop) return;
    this.x -= 4;
    // 碰撞检测
    const { bird } = this.game.actors;
    // 分别检测上管道和下管道
    // 因为管道分两部分，因此以鸟为中心分别检测两次, 这样算法是通用的基类提供的算法
    if (
      bird.aabb(this.x, 0, this.w, this.uH) ||
      bird.aabb(this.x, this.uH + this.gap, this.w, this.dH)
    ) {
      // game over
      this.game.enter("end");
      return;
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
    this.game.drawImageByName("pipe_up", this.x, this.uH - this.h);
    this.game.drawImageByName("pipe_down", this.x, this.uH + this.gap);
  }
}

module.exports = Pipe;
