function PlayBtn(game) {
  const { ctx, img } = game;
  // x 坐标
  let y = 640;
  let fno = 0;

  // 更新y坐标，游戏名称从顶部坠落, 开始按钮从底部升起
  // 利用局部帧来控制，这样可以保证二者同时开始，同时停止
  // 走若干帧停止
  const update = () => {
    if (fno > 15) return;
    fno += 1;
    y -= fno * 1.5;
  };

  const render = () => {
    ctx.drawImage(img, 700, 235, 112, 62, 124, y, 112, 62);
  };

  const reset = () => {
    y = 0;
    fno = 0;
  };

  return { update, render, reset };
}

module.exports = PlayBtn;
