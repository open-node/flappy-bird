const Actor = require("./actor");

class PlayBtn extends Actor {
  reset() {
    this.w = 112; // 图形高度
    this.h = 62; // 图形宽度
    this.oX = 700; // 图形所在大图的x位置偏移量
    this.oY = 235; // 图形所在大图的y作为偏移量
    this.x = 124; // 图形在画布中的x位置偏移量
    this.y = 640; // 图形在画布中的y位置偏移量
    this.v = 0; // 按钮纵向速度，有方向，大于0朝下，小于0朝上
  }

  update() {
    if (this.v > 15) return;
    this.v += 1;
    this.y -= this.v * 1.5;
  }

  render() {
    const { ctx, img } = this.game;
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.y, this.w, this.h);
  }

  click(x, y) {
    if (this.isItOn(x, y)) this.game.enter("play");
  }
}

module.exports = PlayBtn;
