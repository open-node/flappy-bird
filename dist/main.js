(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Game = require("./src/game");
const game = new Game(document.getElementById("mycanvas"));

},{"./src/game":13}],2:[function(require,module,exports){
/**
 * Actor 类
 * @class
 * @param {Game} game 游戏实例
 * @return {Actor} Instance
 */
class Actor {
  /** Create a actor instance */
  constructor(game) {
    this.game = game;
    /* 角色 x 坐标值 */
    this.x = 0;

    /* 角色 y 坐标值 */
    this.y = 0;

    /* 角色 宽度 */
    this.w = 0;

    /* 角色 高度 */
    this.h = 0;

    this.reset();
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
   * 碰撞判断
   * @param {Actor} target
   *
   * @return {boolean}
   */
  aabb(x, y, w, h) {
    // this.x < x + w 目标的右侧在当前左侧之右
    // x < this.x + this.w 目标的左侧在当前右侧之左
    // y < this.y + this.h 目标顶部在当前底部之上
    // this.y < y + h 目标底部在当前顶部之下
    return this.x < x + w && x < this.x + this.w && y < this.y + this.h && this.y < y + h;
  }

  /**
   * 给定一组 x, y判断是否在角色身上
   *
   * @return {boolean}
   */
  isItOn(cX, cY) {
    return cX > this.x && cX < this.x + this.w && cY > this.y && cY < this.y + this.h;
  }

  /**
   * 判断是否已经出去在画布之外
   *
   * @return {boolean}
   */
  get isOut() {
    return this.x < -this.w || this.game.w < this.x || this.game.h < this.y || this.y < 0;
  }

  /**
   * 绘制图片切片
   */
  drawImageSlice() {
    const { ctx, img } = this.game;
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

module.exports = Actor;

},{}],3:[function(require,module,exports){
const Actor = require("./actor");

class Background extends Actor {
  reset() {
    this.x = 0;
    this.stop = true;
    this.oX = 0;
    this.oY = 0;
    this.w = 285;
    this.h = 510;
    this.lackH = 130;
  }

  constructor(game) {
    super(game);

    // 随机选择白天or黑夜的背景图
    // 这里的 X 计算的是切片的x位移量
    this.oX = 293 * (((Math.random() * 7919) | 0) % 2);
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 1;
  }

  render() {
    const { ctx, img } = this.game;
    // 收尾详解三个切面图
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x, this.lackH, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w, this.lackH, this.w, this.h);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.h, this.x + this.w * 2, this.lackH, this.w, this.h);

    // 补充头部确实的区域
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x, 0, this.w, this.lackH);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x + this.w, 0, this.w, this.lackH);
    ctx.drawImage(img, this.oX, this.oY, this.w, this.lackH, this.x + this.w * 2, 0, this.w, this.lackH);
  }
}

module.exports = Background;

},{"./actor":2}],4:[function(require,module,exports){
const Actor = require("./actor");

const n = ((Math.random() * 7919) | 0) % 3;

class Bird extends Actor {
  reset() {
    this.x = 164;
    this.y = 300;
    this.w = 32;
    this.h = 32;
    this.wing = 0;
    this.isDead = false; // 是否已死亡，先死往后后坠毁完毕
    this.falled = false; // 是否已坠毁
    this.v = 0; // 局部帧编号
    this.stop = false; // 是否停止动画
    this.g = 0.32; // 重力加速度
  }

  update() {
    if (this.stop) return;
    this.y += this.v * this.g;
    // 不能超过天空极限
    if (this.y < 0) this.y = 0;
    this.v += 1;

    // 落地会摔死
    if (this.game.h - 112 < this.y) {
      this.falled = true;
      // 转场进入game over
      this.game.enter("score");
    }

    // 降落不用煽动翅膀
    if (this.v < 0) {
      if (this.wing > 1) {
        this.wing = 0;
      } else if (this.game.fno % 7 === 0) {
        this.wing += 1;
      }
    }
  }

  // 点击向上升起
  click() {
    if (this.isDead) return;
    this.v = -20;
  }

  // game over 小鸟大头朝下坠毁
  die() {
    this.isDead = true;
    this.v = 0;
  }

  render() {
    // 坠毁后不显示了
    if (this.falled) return;
    this.game.drawImageByName(`bird_${n}_${this.wing}`, this.x, this.y);
  }
}

module.exports = Bird;

},{"./actor":2}],5:[function(require,module,exports){
const Actor = require("./actor");

class GameOver extends Actor {
  reset() {
    this.y = -48;
    this.maxY = 160; // 纵向最大值
    this.w = 192;
    this.x = (this.game.w - this.w) >> 1;
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
  }

  update() {
    if (this.maxY <= this.y) return;
    this.y += this.v * this.g;
    this.v += 1;
  }

  render() {
    this.game.drawImageByName("game_over", this.x, this.y);
  }
}

module.exports = GameOver;

},{"./actor":2}],6:[function(require,module,exports){
const Actor = require("./actor");

class Land extends Actor {
  reset() {
    this.x = 0;
    this.y = 528;
    this.stop = true;
    this.w = 335;
    this.h = 110;
  }

  update() {
    if (this.stop) return;
    if (this.x < -this.w) this.x = 0;
    this.x -= 4;
  }

  render() {
    // 收尾详解三个切面图
    this.game.drawImageByName("land", this.x, this.y);
    this.game.drawImageByName("land", this.x + this.w, this.y);
    this.game.drawImageByName("land", this.x + this.w * 2, this.y);
  }
}

module.exports = Land;

},{"./actor":2}],7:[function(require,module,exports){
const Actor = require("./actor");

class Name extends Actor {
  reset() {
    this.v = 0;
    this.x = 90;
    this.y = 0;
  }

  // 更新y坐标，游戏名称从顶部坠落, 开始按钮从底部升起
  // 利用局部帧来控制，这样可以保证二者同时开始，同时停止
  // 走若干帧停止
  update() {
    if (this.v > 15) return;
    this.v += 1;
    this.y += this.v;
  }

  render() {
    this.game.drawImageByName("name", this.x, this.y);
  }
}

module.exports = Name;

},{"./actor":2}],8:[function(require,module,exports){
const Actor = require("./actor");

class Numbers extends Actor {
  reset() {
    this.x = 0;
    this.y = -100;
    this.align = "center";
    this.alignValue = 0;
  }

  constructor(game, isTall, getVal) {
    super(game);
    this.isTall = isTall;
    this.getVal = getVal;

    this.w = this.isTall ? 26 : 16;
    this.h = this.isTall ? 36 : 24;

    const { img } = game;
    const numbers = [
      [
        [img, 272, 612, this.w, this.h, this.x, this.y, this.w, this.h], // 0
        [img, 272, 954, this.w, this.h, this.x, this.y, this.w, this.h], // 1
        [img, 272, 978, this.w, this.h, this.x, this.y, this.w, this.h], // 2
        [img, 260, 1002, this.w, this.h, this.x, this.y, this.w, this.h], // 3,
        [img, 1002, 0, this.w, this.h, this.x, this.y, this.w, this.h], // 4
        [img, 1002, 24, this.w, this.h, this.x, this.y, this.w, this.h], // 5
        [img, 1008, 52, this.w, this.h, this.x, this.y, this.w, this.h], // 6
        [img, 1008, 84, this.w, this.h, this.x, this.y, this.w, this.h], // 7
        [img, 584, 484, this.w, this.h, this.x, this.y, this.w, this.h], // 8
        [img, 620, 412, this.w, this.h, this.x, this.y, this.w, this.h] // 9
      ],
      [
        [img, 990, 118, this.w, this.h, this.x, this.y, this.w, this.h], // 0
        [img, 272, 910, this.w, this.h, this.x, this.y, this.w, this.h], // 1
        [img, 583, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 2
        [img, 612, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 3
        [img, 639, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 4
        [img, 666, 319, this.w, this.h, this.x, this.y, this.w, this.h], // 5
        [img, 582, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 6
        [img, 610, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 7
        [img, 638, 366, this.w, this.h, this.x, this.y, this.w, this.h], // 8
        [img, 666, 366, this.w, this.h, this.x, this.y, this.w, this.h] // 9
      ]
    ];
    this.numbers = numbers[this.isTall & 1];
  }

  updateX() {
    const len = this.getVal().toString().length;
    if (this.align === "center") {
      this.x = (this.game.w - this.w * len) >> 1;
    } else if (this.align === "left") {
      this.x = this.alignValue;
    } else {
      this.x = this.game.w - this.alignValue - this.w * len;
    }
  }

  render() {
    const str = this.getVal().toString();
    this.updateX();
    for (let i = 0; i < str.length; i += 1) {
      const ch = str[i];
      const args = this.numbers[ch];
      args[5] = this.x + i * this.w;
      args[6] = this.y;
      this.game.ctx.drawImage(...args);
    }
  }
}

module.exports = Numbers;

},{"./actor":2}],9:[function(require,module,exports){
const Actor = require("./actor");

class Pipe extends Actor {
  reset() {
    this.gap = 200;
    const { img } = this.game;
    this.uH = (10 + Math.random() * 300) | 0; // 上管道高度, 高度在20 ~ 100 之间随机
    this.dH = 640 - 112 - this.gap - this.uH; // 下管道高度
    this.x = 360;
    this.y = 528;
    this.stop = false;
    this.w = 52;
    this.h = 326;
    this.up = [img, 112, 640 + this.h - this.uH, this.w, this.uH, this.x, 0, this.w, this.uH];
    this.down = [img, 168, 640, this.w, this.dH, this.x, this.uH + this.gap, this.w, this.dH];
    this.passed = false;
  }

  update(collection) {
    if (this.stop) return;
    this.x -= 4;
    // 碰撞检测
    const { bird } = this.game.actors;
    // 分别检测上管道和下管道
    // 因为管道分两部分，因此以鸟为中心分别检测两次, 这样算法是通用的基类提供的算法
    if (bird.aabb(this.x, 0, this.w, this.uH) || bird.aabb(this.x, this.uH + this.gap, this.w, this.dH)) {
      // game over
      return this.game.enter("end");
    }

    // 检测是否小鸟越过
    if (!this.passed && this.x + this.w < bird.x) {
      this.game.scores.curr += 1;
      this.passed = true;
    }

    // 判断是否出界，出界从队列移除
    if (collection && this.isOut) {
      const index = collection.indexOf(this);
      if (-1 < index) collection.splice(index, 1);
    }
  }

  render() {
    const { ctx, img } = this.game;
    this.up[5] = this.x;
    this.down[5] = this.x;

    ctx.drawImage(...this.up);
    ctx.drawImage(...this.down);
  }
}

module.exports = Pipe;

},{"./actor":2}],10:[function(require,module,exports){
const Actor = require("./actor");

class PlayBtn extends Actor {
  reset() {
    this.w = 112; // 图形高度
    this.h = 62; // 图形宽度
    this.x = 124; // 图形在画布中的x位置偏移量
    this.y = 640; // 图形在画布中的y位置偏移量
    this.v = 0; // 按钮纵向速度，有方向，大于0朝下，小于0朝上
    this.minY = 360;
  }

  update() {
    if (this.y < this.minY) return;
    this.v += 1;
    this.y -= this.v * 1.5;
  }

  render() {
    this.game.drawImageByName("play_btn", this.x, this.y);
  }

  click(x, y) {
    if (this.isItOn(x, y)) {
      this.game.enter("play");
    }
  }
}

module.exports = PlayBtn;

},{"./actor":2}],11:[function(require,module,exports){
const Actor = require("./actor");

class RankingBtn extends Actor {
  reset() {
    this.w = 112; // 图形高度
    this.h = 62; // 图形宽度
    this.x = 192; // 图形在画布中的x位置偏移量
    this.y = 640; // 图形在画布中的y位置偏移量
    this.v = 0; // 按钮纵向速度，有方向，大于0朝下，小于0朝上
    this.minY = 360;
  }

  update() {
    if (this.y < this.minY) return;
    this.v += 1;
    this.y -= this.v * 1.5;
  }

  render() {
    this.game.drawImageByName("rank_btn", this.x, this.y);
  }

  click(x, y) {
    if (this.isItOn(x, y)) {
      this.game.enter("ranking");
    }
  }
}

module.exports = RankingBtn;

},{"./actor":2}],12:[function(require,module,exports){
const Actor = require("./actor");

class ScoreCard extends Actor {
  reset() {
    this.x = 64;
    this.w = 232;
    this.h = 118;
    this.y = this.game.h + this.h;
    this.minY = 260; // 纵向最大值
    this.v = 0; // 局部帧编号
    this.g = 0.32; // 重力加速度
    this.isNew = false; // 是否是新纪录
    this.ranking = "none";
  }

  constructor(game) {
    super(game);

    const { img } = game;
    const birds = [
      [
        [img, 175, 975, this.w, this.h, this.x, -16, this.w, this.h],
        [img, 230, 650, this.w, this.h, this.x, -16, this.w, this.h],
        [img, 230, 702, this.w, this.h, this.x, -16, this.w, this.h]
      ]
    ];
    // 三只小鸟，随机选择一个
    const n = ((Math.random() * 7919) | 0) % birds.length;
    this.bird = birds[n];
  }

  update() {
    if (this.y <= this.minY) return;
    this.y -= this.v * this.g;
    this.v += 1;
    this.game.actors.currScore.y = this.y + 34;
    this.game.actors.bestScore.y = this.y + 74;
  }

  render() {
    this.game.drawImageByName("score_card", this.x, this.y);
    this.game.drawImageByName(
      `medal_${this.ranking}`,
      this.x + 32,
      this.y + 45
    );
  }
}

module.exports = ScoreCard;

},{"./actor":2}],13:[function(require,module,exports){
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

},{"./actors/background":3,"./actors/bird":4,"./actors/game-over":5,"./actors/land":6,"./actors/name":7,"./actors/numbers":8,"./actors/play-btn":10,"./actors/rank-btn":11,"./actors/score-card":12,"./scenes/end":14,"./scenes/play":15,"./scenes/score":17,"./scenes/start":18}],14:[function(require,module,exports){
const Scene = require("./scene");

class End extends Scene {
  update() {
    if (1 <= this.alpha) {
      this.alpha = 1;
    } else {
      this.alpha += 0.05;
    }
    this.game.ctx.globalAlpha = this.alpha;
    this.game.actors.bird.update();
  }

  enter() {
    this.actors = ["bg", "land", "pipes", "bird"];
    this.alpha = 0;

    const { bg, land, bird, pipes } = this.game.actors;
    bg.stop = true;
    land.stop = true;
    bird.die();
    for (const x of pipes) x.stop = true;
  }
}

module.exports = End;

},{"./scene":16}],15:[function(require,module,exports){
const Scene = require("./scene");
const Pipe = require("../actors/pipe");

class Play extends Scene {
  update() {
    super.update();
    const { actors, fno } = this.game;
    if (fno % 150 === 0) actors.pipes.push(new Pipe(this.game));
  }

  enter() {
    this.actors = ["bg", "land", "pipes", "bird", "liveScore"];
    const { bg, land, bird, liveScore } = this.game.actors;
    bg.stop = false;
    land.stop = false;
    bird.reset();
    bird.stop = false;
    bird.x = 80;
    liveScore.y = 100;
    this.game.actors.pipes = [];
    this.game.scores.curr = 0; // 分数清零
  }
}

module.exports = Play;

},{"../actors/pipe":9,"./scene":16}],16:[function(require,module,exports){
/**
 * Scene 类
 * @class
 * @param {Game} game 游戏实例
 * @return {Scene} Instance
 */
class Scene {
  /** Create a scene instance */
  constructor(game, name) {
    // 当前场景需要的角色名称
    this.actors = [""];

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
      const actor = this.game.actors[key];
      if (!actor) continue;
      if (Array.isArray(actor)) {
        for (const x of actor) x.update(actor);
      } else {
        actor.update();
      }
    }
  }

  /**
   * 渲染各成员
   *
   * @return {void}
   */
  render() {
    for (const key of this.actors) {
      const actor = this.game.actors[key];
      if (!actor) continue;
      if (Array.isArray(actor)) {
        for (const x of actor) x.render();
      } else {
        actor.render();
      }
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
      if (actor.click) actor.click(x, y);
    }
  }
}

module.exports = Scene;

},{}],17:[function(require,module,exports){
const Scene = require("./scene");

class Score extends Scene {
  enter() {
    this.actors = [
      "bg",
      "land",
      "pipes",
      "gameOver",
      "scoreCard",
      "currScore",
      "bestScore",
      "playBtn",
      "rankBtn"
    ];

    this.alpha = 0;

    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
    this.game.actors.bird.v = 0;
    for (const x of this.game.actors.pipes) x.stop = true;

    // 计算名次
    const { curr: score, record, best } = this.game.scores;
    const { scoreCard, playBtn, rankBtn } = this.game.actors;
    scoreCard.reset();
    if (best < score) {
      this.game.scores.best = score;
      scoreCard.isNew = true;
      scoreCard.ranking = 1;
    } else if (record[0] != null && record[0][0] < score) {
      scoreCard.ranking = 1;
    } else if (record[1] != null && record[1][0] < score) {
      scoreCard.ranking = 2;
    } else if (record[2] != null && record[2][0] < score) {
      scoreCard.ranking = 3;
    }

    // 加入记录，更新排行榜
    this.game.scores.record.push([score, new Date()]);
    this.game.scores.record.sort((a, b) => b[0] - a[0]);

    // 积分显示
    this.game.actors.currScore.align = "right";
    this.game.actors.currScore.alignValue = 86;
    this.game.actors.currScore.y = scoreCard.y + 34;

    this.game.actors.bestScore.align = "right";
    this.game.actors.bestScore.alignValue = 86;
    this.game.actors.bestScore.y = scoreCard.y + 74;

    // 重新开始按钮
    playBtn.reset();
    playBtn.x = (this.game.w - scoreCard.w) >> 1;
    playBtn.minY = scoreCard.minY + scoreCard.h + 20;

    // 查看rank 按钮
    rankBtn.reset();
    rankBtn.minY = scoreCard.minY + scoreCard.h + 20;
  }
}

module.exports = Score;

},{"./scene":16}],18:[function(require,module,exports){
const Scene = require("./scene");

class Start extends Scene {
  enter() {
    // 角色，有层级之分，越靠后的z层级越高，会覆盖前面的
    this.actors = ["bg", "land", "name", "playBtn", "bird"];

    this.game.actors.bg.stop = true;
    this.game.actors.land.stop = true;
    this.game.actors.bird.stop = true;
  }
}

module.exports = Start;

},{"./scene":16}]},{},[1]);
