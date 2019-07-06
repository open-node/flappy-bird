const Background = require("./actors/background");
const Land = require("./actors/land");
const Name = require("./actors/name");
const PlayBtn = require("./actors/play-btn");
const Bird = require("./actors/bird");
const Start = require("./scenes/start");
const Play = require("./scenes/play");
const End = require("./scenes/end");

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.w = canvas.width;
    this.h = canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.img = null; // 资源图片，因为合成在了一起，所以只有一个图片资源需要加载
    this.scene = null; // 当前场景，初始为 start 场景
    this.scenes = {};
    this.timer = null;
    this.fno = 0; // 程序主帧
    this.actors = {}; // 角色管理器
    this.loadResources(this.start.bind(this));
  }

  // 创建角色, 并非游戏全部角色
  // 这里创建的角色一般为多场景共用的单一角色
  // 场景特有的角色一般在场景内创建
  createActors() {
    // 游戏背景
    this.actors.bg = new Background(this);
    // 开始页面游戏名称
    this.actors.name = new Name(this);
    // 开始按钮
    this.actors.playBtn = new PlayBtn(this);
    // 小鸟
    this.actors.bird = new Bird(this);
    // 大地
    this.actors.land = new Land(this);
    // 管道角色集合
    this.actors.pipes = [];
  }

  // 创建场景
  createScenes() {
    // 游戏开始场景
    this.scenes.start = new Start(this, "start");
    // play 场景
    this.scenes.play = new Play(this, "play");
    // end 场景
    this.scenes.end = new End(this, "end");
  }

  // 开始事件监听
  listenEvent() {
    this.canvas.onclick = event => {
      const x = event.clientX;
      const y = event.clientY;
      this.scene.click(x, y);
    };
  }

  // 开始游戏，游戏资源全部加载完毕后
  start() {
    // 创建公共角色
    this.createActors();

    // 创建场景
    this.createScenes();

    // 进入start场景
    this.enter("start");

    // 事件监听
    this.listenEvent();

    // 游戏主循环启动
    this.timer = setInterval(() => {
      this.fno += 1;
      // 擦除
      this.ctx.clearRect(0, 0, this.w, this.h);
      // 场景更新
      this.scene.update();
      // 场景渲染
      this.scene.render();

      // 输出调试信息
      this.debugg();
    }, 20);
  }

  debugg() {
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Fno: ${this.fno}`, 5, 20);
    this.ctx.fillText(`Scene: ${this.scene.name}`, 5, 40);
  }

  // 进入某个场景
  enter(name) {
    if (!name) throw Error("场景名不能为空");
    const scene = this.scenes[name];
    if (!scene) throw Error(`不存在此场景 ${name}`);
    this.scene = scene;
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
