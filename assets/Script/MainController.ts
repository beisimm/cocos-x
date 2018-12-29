// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    @property(cc.Sprite)
    brid0: cc.Sprite = null;

    @property(cc.Sprite)
    brid1: cc.Sprite = null;

    @property(cc.Sprite)
    brid2: cc.Sprite = null;

    @property(cc.Sprite)
    brid3: cc.Sprite = null;

    @property(cc.Node)
    birdParent: cc.Node = null;

    @property(cc.Node)
    bg0: cc.Node = null;

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    pipeParent0: cc.Node = null;

    @property(cc.Node)
    pipeParent1: cc.Node = null;

    @property(cc.Node)
    pipeParent2: cc.Node = null;

    @property(cc.Label)
    lbScore: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    time: number = 0; //距离上次切换显示小鸟流逝的时间
    speed: number = 0; //小鸟的重力加速度
    score: number = 0; //得分

    start() {
        let pipeStartOffsetX: number = 200;  //开始偏移量, 让开始的时候都在屏幕外面
        let spaceX = (288 + 52) / 3;
        this.pipeParent0.x = pipeStartOffsetX + spaceX * 0;
        this.pipeParent1.x = pipeStartOffsetX + spaceX * 1;
        this.pipeParent2.x = pipeStartOffsetX + spaceX * 2;


    }

    update(dt: number) {
        this.time += dt;
        if (this.time > 0.5) {
            if (this.brid0.node.active) {
                this.brid0.node.active = false;
                this.brid1.node.active = true;
            } else if (this.brid1.node.active) {
                this.brid1.node.active = false;
                this.brid2.node.active = true;

            } else if (this.brid2.node.active) {
                this.brid2.node.active = false;
                this.brid3.node.active = true;

            } else if (this.brid3.node.active) {
                this.brid3.node.active = false;
                this.brid0.node.active = true;
            }
            this.time = 0;
        }
        this.speed -= 0.05;
        this.birdParent.y += this.speed; //小鸟下落, 模拟重力加速度

        this.birdParent.angle = this.speed * 10; //小鸟的旋转角度

        this.bgMove(this.bg0);
        this.bgMove(this.bg1);
        this.pipeMove(this.pipeParent0);
        this.pipeMove(this.pipeParent1);
        this.pipeMove(this.pipeParent2);
        this.checkCollision(this.birdParent, this.pipeParent0);
        this.checkCollision(this.birdParent, this.pipeParent1);
        this.checkCollision(this.birdParent, this.pipeParent2);

    }

    bgMove(bg: cc.Node) {
        bg.x -= 1;
        if (bg.x < -288) {
            bg.x += 288 * 2;
        }
    }

    pipeMove(pipe: cc.Node) {
        pipe.x -= 3;
        if (pipe.x < -144 - 26) {  //从中心点开始计算 背景的一半+上自身的一半
            pipe.x += (288 + 52);  //移出屏幕外面
            pipe.y = Math.random() * 50;  //让管道每次随机上下移动
            this.score += 1; // 得分加1
            this.lbScore.string = this.score.toString();
            console.log(this.lbScore.string)
        }
    }

    onButtonClick() {
        this.speed = 2.5;//屏幕点击时小鸟往上走
    }

    checkCollision(bird: cc.Node, pipe: cc.Node) { //如果没发生碰撞事件则返回
        if (bird.x + 17 < pipe.x - 26) {   //没碰前面
            return;
        }
        if (bird.x - 17 > pipe.x + 26) {  //没碰后面
            return;
        }
        if (bird.y + 12 < pipe.y + 50 && bird.y - 12 > pipe.y - 50) {  //没碰上下这里判断的是不是在上和下的区间
            return
        }
        console.log("发生了碰撞");
    }
}
