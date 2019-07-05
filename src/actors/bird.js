function Bird(game) {
  const { ctx, img } = game;
  // x 坐标
  let y = 300;
  let wing = 0;
  let fno = 0; // 局部帧编号
  let stop = 0; // 是否停止动画
  const birds = [
    [
      [img, 175, 975, 32, 32, 164, -16, 32, 32],
      [img, 230, 650, 32, 32, 164, -16, 32, 32],
      [img, 230, 702, 32, 32, 164, -16, 32, 32]
    ]
  ];

  // 三只小鸟，随机选择一个
  const n = ((Math.random() * 7919) | 0) % birds.length;
  const bird = birds[n];

  const update = () => {
    if (!stop) {
      y += fno * 0.23;
      fno += 1;
    }
    if (wing > 1) {
      wing = 0;
    } else if (game.fno % 7 === 0) {
      wing += 1;
    }
  };

  // 向上升级
  const up = () => {
    if (stop) return;
    fno = -20;
  };

  const render = () => {
    const args = bird[wing];
    args[6] = y;
    ctx.drawImage(...args);
  };

  const setStop = value => {
    stop = !!value;
  };

  const reset = () => {
    wing = 0;
    fno = 0;
    y = 300;
  };

  return { update, render, setStop, reset, up };
}

module.exports = Bird;
