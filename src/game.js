const Start = require("./scenes/start");

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = null; // 资源图片，因为合成在了一起，所以只有一个图片资源需要加载
    this.scene = null; // 当前场景，初始为 start 场景
    this.scenes = {};
    this.timer = null;
    this.fno = 0; // 程序主帧
    this.loadResources(this.start.bind(this));
  }

  // 开始游戏，游戏资源全部加载完毕后
  start() {
    // 初始化场景
    this.scenes.start = new Start(this);
    // 进入start场景
    this.enter("start");

    // 游戏主循环启动
    this.timer = setInterval(() => {
      this.fno += 1;
      const scene = this.scenes[this.scene];
      // 擦除
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // 场景更新
      scene.update();
      // 场景渲染
      scene.render();

      // 输出调试信息
      this.debugg();
    }, 20);
  }

  debugg() {
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Fno: ${this.fno}`, 5, 20);
    this.ctx.fillText(`Scene: ${this.scene}`, 5, 40);
  }

  // 进入某个场景
  enter(name) {
    if (!name) throw Error("场景名不能为空");
    const scene = this.scenes[name];
    if (!scene) throw Error(`不存在此场景 ${name}`);
    this.scene = name;
    scene.enter();
  }

  // 加载游戏所需静态资源
  loadResources(callback) {
    this.img = new Image();
    this.img.onload = callback;
    this.img.src = "./images/atlas.png";
  }
}

module.exports = Game;
