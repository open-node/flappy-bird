function Start(game) {
  const actors = ["bg", "name", "playBtn"];
  // update 更新个成员
  const update = () => {
    for (const actor of actors) game.actors[actor].update();
  };

  // 渲染各成员
  const render = () => {
    for (const actor of actors) game.actors[actor].render();
  };

  // 进入场景
  const enter = () => {
    game.actors.bg.setStop(true);
  };

  return { update, render, enter };
}

module.exports = Start;
