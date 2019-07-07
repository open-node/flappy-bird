const Actor = require("./actor");

class Numbers extends Actor {
  reset() {
    this.x = 0;
    this.y = -100;
    this.w = this.isTall ? 24 : 16;
    this.h = this.isTall ? 36 : 24;
  }

  constructor(game, isTall, getVal) {
    super(game);
    this.isTall = isTall;
    this.getVal = getVal;

    const { img } = game;
    const numbers = [
      [
        [img, 992, 120, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 272, 910, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 585, 319, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 612, 319, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 639, 319, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 666, 319, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 585, 356, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 612, 393, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 639, 430, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 666, 467, this.w, this.h, this.x, this.y, this.w, this.h]
      ],
      [
        [img, 272, 120, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 272, 954, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 272, 980, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 261, 1026, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 1002, 0, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 1002, 28, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 1010, 60, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 1010, 92, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 585, 483, this.w, this.h, this.x, this.y, this.w, this.h],
        [img, 624, 413, this.w, this.h, this.x, this.y, this.w, this.h]
      ]
    ];
    this.numbers = numbers[this.isTall ? 0 : 1];
  }

  render() {
    const str = this.getVal().toString();
    this.x = (str.length * this.w) >> 1;
    for (const ch of str) {
      const args = this.numbers[ch];
      args[5] = this.x;
      args[6] = this.y;
      this.game.ctx.drawImage(...args);
    }
  }
}

module.exports = Numbers;
