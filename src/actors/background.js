function Background(game) {
  const { ctx, img } = game;
  // x 坐标
  let x = 0;
  // 是否停止运动
  let stop = true;

  // 随机选择白天or黑夜的背景图
  // 这里的 X 计算的是切片的x位移量
  const X = 293 * (((Math.random() * 7919) | 0) % 2);

  const update = () => {
    if (stop) return;
    if (x < -285) x = 0;
    x -= 2;
  };

  const render = () => {
    // 收尾详解三个切面图
    ctx.drawImage(img, X, 0, 285, 510, x, 130, 285, 510);
    ctx.drawImage(img, X, 0, 285, 510, x + 285, 130, 285, 510);
    ctx.drawImage(img, X, 0, 285, 510, x + 285 * 2, 130, 285, 510);

    // 补充头部确实的区域
    ctx.drawImage(img, X, 0, 285, 130, x, 0, 285, 130);
    ctx.drawImage(img, X, 0, 285, 130, x + 285, 0, 285, 130);
    ctx.drawImage(img, X, 0, 285, 130, x + 285 * 2, 0, 285, 130);
  };

  const setStop = value => {
    stop = !!value;
  };

  return { update, render, setStop };
}

module.exports = Background;
