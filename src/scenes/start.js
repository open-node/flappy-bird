function Start(game) {
  // update 更新个成员
  const update = () => {
    game.actors.bg.update();
  };

  // 渲染各成员
  const render = () => {
    game.actors.bg.render();
  };

  // 进入场景
  const enter = () => {
    game.actors.bg.setStop(false);
  };

  return { update, render, enter };
}

module.exports = Start;
