/**
 * Scene 类
 * @class
 * @param {Game} game 游戏实例
 * @return {Scene} Instance
 */
class Scene {
  // 当前场景需要的角色名称
  actors = [""];

  /** Create a scene instance */
  constructor(game, name) {
    this.name = name;
    this.game = game;
  }

  /**
   * 更新各成员
   *
   * @return {void}
   */
  update() {
    for (const key of this.actors) {
      this.game.actors[key].update();
    }
  }

  /**
   * 渲染各成员
   *
   * @return {void}
   */
  render() {
    for (const key of this.actors) {
      this.game.actors[key].render();
    }
  }

  /**
   * 进入场景
   *
   * @return {void}
   */
  enter() {
    throw Error("进入场景无法实现公用方法, 请子类实现");
  }

  /**
   * 点击事件
   *
   * @return {void}
   */
  click(x, y) {
    for (const key of this.actors) {
      const actor = this.game.actors[key];
      if (actor.click && actor.isItOn(x, y)) actor.click(x, y);
    }
  }
}

module.exports = Scene;
