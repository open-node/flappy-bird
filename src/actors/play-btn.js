const Actor = require("./actor");

class PlayBtn extends Actor {
  reset() {
    this.x = (this.game.w - this.w) >> 1; // 图形在画布中的x位置偏移量
    this.y = this.game.h; // 图形在画布中的y位置偏移量
    this.v = 0; // 按钮纵向速度，有方向，大于0朝下，小于0朝上
    this.minY = 360;
  }

  update() {
    if (this.y < this.minY) return;
    this.v += 1;
    this.y -= this.v * 1.5;
  }

  render() {
    this.game.drawImageByName("play_btn", this.x, this.y);
  }

  click(x, y) {
    if (this.isItOn(x, y)) {
      this.game.enter("tour");
    }
  }
}

module.exports = PlayBtn;
