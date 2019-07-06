const Actor = require("./actor");

class Background extends Actor {
  reset() {
    this.x = 0;
    this.stop = true;
    this.oX = 0;
    this.oY = 0;
    this.w = 285;
    this.h = 510;
    this.lackH = 130;
  }

  constructor(game) {
    super(game);

    // 随机选择白天or黑夜的背景图
    // 这里的 X 计算的是切片的x位移量
    this.oX = 293 * (((Math.random() * 7919) | 0) % 2);
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 1;
  }

  render() {
    const { ctx, img } = this.game;
    // 收尾详解三个切面图
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.lackH, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w, this.lackH, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w * 2, this.lackH, this.w, this.h);

    // 补充头部确实的区域
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x, 0, this.w, this.lackH);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x + this.w, 0, this.w, this.lackH);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x + this.w * 2, 0, this.w, this.lackH);
  }
}

module.exports = Background;
