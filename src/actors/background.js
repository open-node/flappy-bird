const Actor = require("./actor");

const n = ((Math.random() * 7919) | 0) % 2;

class Background extends Actor {
  reset() {
    this.x = 0;
    this.stop = true;
    this.lackH = 130;
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 1;
  }

  render() {
    // 收尾详解三个切面图
    this.game.drawImageByName(`bg_${n}`, this.x, this.lackH);
    this.game.drawImageByName(`bg_${n}`, this.x + this.w, this.lackH);
    this.game.drawImageByName(`bg_${n}`, this.x + this.w * 2, this.lackH);

    // 补充头部确实的区域
    this.game.drawImageByName(`sky_${n}`, this.x, 0);
    this.game.drawImageByName(`sky_${n}`, this.x + this.w, 0);
    this.game.drawImageByName(`sky_${n}`, this.x + this.w * 2, 0);
  }
}

module.exports = Background;
