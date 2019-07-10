const Actor = require("./actor");

class Numbers extends Actor {
  reset() {
    this.x = 0;
    this.y = -100;
    this.align = "center";
    this.alignValue = 0;
  }

  constructor(game, size, type, getVal) {
    super(game, size);
    this.type = type;
    this.getVal = getVal;
  }

  updateX() {
    const len = this.getVal().toString().length;
    if (this.align === "center") {
      this.x = (this.game.w - this.w * len) >> 1;
    } else if (this.align === "left") {
      this.x = this.alignValue;
    } else {
      this.x = this.game.w - this.alignValue - this.w * len;
    }
  }

  render() {
    const str = this.getVal().toString();
    this.updateX();
    for (let i = 0; i < str.length; i += 1) {
      const ch = str[i];
      const name = `number_${this.type}_${ch}`;
      this.game.drawImageByName(name, this.x + i * this.w, this.y);
    }
  }
}

module.exports = Numbers;
