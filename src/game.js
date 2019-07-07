const Background = require("./actors/background");
const Land = require("./actors/land");
const Name = require("./actors/name");
const PlayBtn = require("./actors/play-btn");
const RankBtn = require("./actors/rank-btn");
const Bird = require("./actors/bird");
const Numbers = require("./actors/numbers");
const GameOver = require("./actors/game-over");
const ScoreCard = require("./actors/score-card");
const Start = require("./scenes/start");
const Play = require("./scenes/play");
const End = require("./scenes/end");
const Score = require("./scenes/score");

const loadImg = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = e => {
      reject(e);
    };

    img.src = src;
  });

const loadImgMap = src =>
  new Promise((resolve, reject) => {
    fetch(src)
      .then(res => {
        resolve(res.text());
      })
      .catch(reject);
  });

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
    this.scores = {
      curr: 0,
      best: 0,
      record: []
    };
    this.init();
  }

  // 初始化, 资源加载之类的
  async init() {
    await this.loadResources();
    this.start();
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
    // 查看排行按钮
    this.actors.rankBtn = new RankBtn(this);
    // 小鸟
    this.actors.bird = new Bird(this);
    // 大地
    this.actors.land = new Land(this);
    // 管道角色集合
    this.actors.pipes = [];
    // game over 提示
    this.actors.gameOver = new GameOver(this);
    // 记分牌
    this.actors.scoreCard = new ScoreCard(this);
    // 实时得分
    this.actors.liveScore = new Numbers(this, true, () => this.scores.curr); // 大号数字显示
    // 本次得分
    this.actors.currScore = new Numbers(this, false, () => this.scores.curr); // 普通数字显示
    // 最高分
    this.actors.bestScore = new Numbers(this, false, () => this.scores.best); // 普通数字显示
  }

  // 创建场景
  createScenes() {
    // 游戏开始场景
    this.scenes.start = new Start(this, "start");
    // play 场景
    this.scenes.play = new Play(this, "play");
    // end 场景
    this.scenes.end = new End(this, "end");
    // end 场景
    this.scenes.score = new Score(this, "score");
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

  // 解析图片map
  parseImageMap(img, map) {
    const maps = {};
    const drawImgs = {};
    map
      .trim()
      .split("\n")
      .forEach(line => {
        const [name, x, y, w, h] = line.split(" ").map((n, i) => {
          if (i) return parseInt(n, 10);
          return n;
        });
        maps[name] = { x, y, w, h };
        drawImgs[name] = [img, x, y, w, h, 0, 0, w, h];
      });

    return [drawImgs, maps];
  }

  // 加载游戏所需静态资源
  async loadResources() {
    const [img, map] = await Promise.all([loadImg("./images/atlas.png"), loadImgMap("./images/atlas.map")]);
    this.img = img;
    const [drawImgs, maps] = this.parseImageMap(img, map);
    this.drawImgs = drawImgs;
    this.imgMaps = maps;
  }

  // 绘制图片
  drawImageByName(name, x, y) {
    const args = this.drawImgs[name];
    if (!args) throw Error("图片不存在");
    args[5] = x;
    args[6] = y;
    this.ctx.drawImage(...args);
  }
}

module.exports = Game;
