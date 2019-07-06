const Actor = require("./actor");

class Land extends Actor {
  reset() {
    this.x = 0;
    this.y = 528;
    this.stop = true;
    this.oX = 585;
    this.oY = 0;
    this.w = 335;
    this.h = 110;
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 4;
  }

  render() {
    const { ctx, img } = this.game;
    // 收尾详解三个切面图
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w * 2, this.y, this.w, this.h);
  }
}

module.exports = Land;
