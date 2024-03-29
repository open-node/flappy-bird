const Actor = require("./actor");

class ScoreCard extends Actor {
  reset() {
    this.x = (this.game.w - this.w) >> 1;
    this.y = this.game.h + this.h;
    this.minY = 260; // 纵向最大值
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
    this.isNew = false; // 是否是新纪录
    this.ranking = "none";
  }

  update() {
    if (this.y <= this.minY) return;
    this.y -= this.v * this.g;
    this.v += 1;
    this.game.actors.currScore.y = this.y + 34;
    this.game.actors.bestScore.y = this.y + 74;
  }

  render() {
    this.game.drawImageByName("score_card", this.x, this.y);
    this.game.drawImageByName(
      `medal_${this.ranking}`,
      this.x + 26,
      this.y + 43
    );
  }
}

module.exports = ScoreCard;
