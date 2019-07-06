/**
 * Actor 类
 * @class
 * @param {Game} game 游戏实例
 * @return {Actor} Instance
 */
class Actor {
  /* 角色 x 坐标值 */
  x = 0;

  /* 角色 y 坐标值 */
  y = 0;

  /* 角色 宽度 */
  w = 0;

  /* 角色 高度 */
  h = 0;

  /** Create a actor instance */
  constructor(game) {
    this.reset();
    this.game = game;
  }

  /**
   * 重置参数值
   *
   * @return {void}
   */
  reset() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
  }

  /**
   * 更新参数值
   *
   * @return {void}
   */
  update() {}

  /**
   * 渲染自己
   *
   * @return {void}
   */
  render() {
    throw Error("请子类自己实现render方法");
  }

  /**
   * 给定一组 x, y判断是否在角色身上
   *
   * @return {boolean}
   */
  isItOn(cX, cY) {
    return (
      cX > this.x && cX < this.x + this.w && cY > this.y && cY < this.y + this.h
    );
  }
}

module.exports = Actor;
