const Actor = require("./actor");

class Numbers extends Actor {
  reset() {
    this.x = 0;
    this.y = -100;
    this.align = "center";
    this.alignValue = 0;
  }

  constructor(game, isTall, getVal) {
    super(game);
    this.isTall = isTall;
    this.getVal = getVal;

    this.w = this.isTall ? 26 : 16;
    this.h = this.isTall ? 36 : 24;

    const { img } = game;
    const numbers = [
      [
        [img, 272, 612, this.w, this.h, this.x, this.y, this.w, this.h], // 0
        [img, 272, 954, this.w, this.h, this.x, this.y, this.w, this.h], // 1
        [img, 272, 978, this.w, this.h, this.x, this.y, this.w, this.h], // 2
        [img, 260, 1002, this.w, this.h, this.x, this.y, this.w, this.h], // 3,
        [img, 1002, 0, this.w, this.h, this.x, this.y, this.w, this.h], // 4
        [img, 1002, 24, this.w, this.h, this.x, this.y, this.w, this.h], // 5
        [img, 1008, 52, this.w, this.h, this.x, this.y, this.w, this.h], // 6
        [img, 1008, 84, this.w, this.h, this.x, this.y, this.w, this.h], // 7
        [img, 584, 484, this.w, this.h, this.x, this.y, this.w, this.h], // 8
        [img, 620, 412, this.w, this.h, this.x, this.y, this.w, this.h] // 9
      ],
      [
        [img, 990, 118, this.w, this.h, this.x, this.y, this.w, this.h], // 0
        [img, 272, 910, this.w, this.h, this.x, this.y, this.w, this.h], // 1
        [img, 583, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 2
        [img, 612, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 3
        [img, 639, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 4
        [img, 666, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 5
        [img, 582, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 6
        [img, 610, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 7
        [img, 638, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 8
        [img, 666, 366, this.w, this.h, this.x, this.y, this.w, this.h] // 9
      ]
    ];
    this.numbers = numbers[this.isTall & 1];
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
      const args = this.numbers[ch];
      args[5] = this.x + i * this.w;
      args[6] = this.y;
      this.game.ctx.drawImage(...args);
    }
  }
}

module.exports = Numbers;
