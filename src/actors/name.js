const Actor = require("./actor");

class Name extends Actor {
  reset() {
    this.v = 0;
    this.oX = 700;
    this.oY = 180;
    this.w = 180;
    this.h = 55;
    this.x = 90;
    this.y = 0;
  }

  // 更新y坐标，游戏名称从顶部坠落, 开始按钮从底部升起
  // 利用局部帧来控制，这样可以保证二者同时开始，同时停止
  // 走若干帧停止
  update() {
    if (this.v > 15) return;
    this.v += 1;
    this.y += this.v;
  }

  render() {
    const { ctx, img } = this.game;
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

module.exports = Name;
