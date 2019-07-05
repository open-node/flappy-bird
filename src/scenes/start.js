function Start(game) {
  const { actors } = game;

  // 场景名称
  const name = "start";

  // 当前场景需要的角色名称
  const _actors = ["bg", "name", "playBtn", "bird"];
  // update 更新个成员
  const update = () => {
    for (const actor of _actors) actors[actor].update();
  };

  // 渲染各成员
  const render = () => {
    for (const actor of _actors) actors[actor].render();
  };

  // 进入场景
  const enter = () => {
    actors.bg.setStop(true);
    actors.bird.setStop(true);
  };

  // 点击事件
  const click = () => {
    actors.bird.up();
  };

  return { name, update, render, enter, click };
}

module.exports = Start;
