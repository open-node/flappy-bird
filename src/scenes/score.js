const Scene = require("./scene");

class Score extends Scene {
  actors = ["bg", "land", "pipes", "gameOver", "scoreCard", "currScore", "bestScore", "playBtn", "rankBtn"];

  alpha = 0;

  enter() {
    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
    this.game.actors.bird.v = 0;
    for (const x of this.game.actors.pipes) x.stop = true;

    this.game.actors.currScore.align = "right";
    this.game.actors.currScore.alignValue = 86;
    this.game.actors.currScore.y = 280;

    this.game.actors.bestScore.y = 322;
    this.game.actors.bestScore.align = "right";
    this.game.actors.bestScore.alignValue = 86;

    // 计算名次
    const { curr: score, record, best } = this.game.scores;
    const { scoreCard, playBtn, rankBtn } = this.game.actors;
    scoreCard.ranking = "none";
    if (best < score) {
      this.game.scores.best = score;
      scoreCard.isNew = true;
      scoreCard.ranking = 1;
    } else if (record[0] != null && record[0][0] < score) {
      scoreCard.ranking = 1;
    } else if (record[1] != null && record[1][0] < score) {
      scoreCard.ranking = 2;
    } else if (record[2] != null && record[2][0] < score) {
      scoreCard.ranking = 3;
    }

    // 加入记录，更新排行榜
    this.game.scores.record.push([score, new Date()]);
    this.game.scores.record.sort((a, b) => b[0] - a[0]);

    // 重新开始按钮
    playBtn.reset();
    playBtn.x = (this.game.w - scoreCard.w) >> 1;
    playBtn.minY = scoreCard.minY + scoreCard.h + 20;

    // 查看rank 按钮
    rankBtn.reset();
    rankBtn.minY = scoreCard.minY + scoreCard.h + 20;
  }
}

module.exports = Score;
