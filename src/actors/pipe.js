const Actor = require("./actor");

class Pipe extends Actor {
  reset() {
    this.gap = 150;
    const { img } = this.game;
    const uH = (20 + Math.random() * 300) | 0; // 上管道高度, 高度在20 ~ 100 之间随机
    const dH = 640 - 112 - this.gap - uH; // 下管道高度
    this.x = 360;
    this.y = 528;
    this.stop = false;
    this.w = 52;
    this.h = 326;
    this.up = [img, 112, 640 + this.h - uH, this.w, uH, this.x, 0, this.w, uH];
    this.down = [img, 168, 640, this.w, dH, this.x, uH + this.gap, this.w, dH];
  }

  update(collection) {
    if (this.stop) return;
    this.x -= 4;

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
