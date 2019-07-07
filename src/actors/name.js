const Actor = require("./actor");

class Name extends Actor {
  reset() {
    this.v = 0;
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
    this.game.drawImageByName("name", this.x, this.y);
  }
}

module.exports = Name;
