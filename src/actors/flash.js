const Actor = require("./actor");

class Flash extends Actor {
  reset() {
    super.reset();
    this.alpha = 1;
  }

  update() {
    if (this.alpha <= 0) {
      this.alpha = 0;
    } else {
      this.alpha -= 0.02;
    }
  }

  render() {
    this.game.ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

module.exports = Flash;
