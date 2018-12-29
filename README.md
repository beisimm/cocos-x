# hello-world
Hello world new project template.
# cocos

[官网](https://www.cocos.com/)

中文社区

## Scene 场景

描绘画面

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546001231641&di=c06455f10a521777820013d426e1b3b9&imgtype=0&src=http%3A%2F%2Fstatics.juxia.com%2Fuploadfile%2Fcontent%2F2014%2F6%2F2014062515564398.jpg)![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546001231641&di=c06455f10a521777820013d426e1b3b9&imgtype=0&src=http%3A%2F%2Fstatics.juxia.com%2Fuploadfile%2Fcontent%2F2014%2F6%2F2014062515564398.jpg)

## sprite 精灵

元素![](http://i1.bvimg.com/673108/553aa26b5e284dfct.jpg)![](http://i1.bvimg.com/673108/553aa26b5e284dfct.jpg)

![](http://i1.bvimg.com/673108/56d2d459ed427c81t.jpg)![](http://i1.bvimg.com/673108/56d2d459ed427c81t.jpg)

![](http://i1.bvimg.com/673108/0fd9a3634de0f09bt.jpg)![](http://i1.bvimg.com/673108/0fd9a3634de0f09bt.jpg)

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546001294357&di=6325d0c149aaf32bc4e376ac938c3d15&imgtype=0&src=http%3A%2F%2Fi7.hexunimg.cn%2F2014-10-20%2F169504388.jpg)![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546001294357&di=6325d0c149aaf32bc4e376ac938c3d15&imgtype=0&src=http%3A%2F%2Fi7.hexunimg.cn%2F2014-10-20%2F169504388.jpg)

## NodeTree,Node 节点数,节点

Node经常用来存放sprite![](http://i2.bvimg.com/673108/6e81b1500d56edea.gif)![](http://i2.bvimg.com/673108/6e81b1500d56edea.gif)

## label

文字显示

# 开始

1 . 首先创建一个项目

2.  创建一个secen
    

3.创建一个script

script 中添加

```javascript
    @property(cc.Sprite)
    brid0: cc.Sprite = null;
```

**然后cocos中进行素材绑定!!!!!!(千万记得要绑定这里是最常见的BUG)**![](http://i1.bvimg.com/673108/363799b7dae647d0.png)![](http://i1.bvimg.com/673108/363799b7dae647d0.png)

#### update(dt)

dt: 距离上一次屏幕刷新的时间间隔1s/dt = fps

其实就是每一帧做什么事情

### 实现小鸟煽动翅膀的动作

其实就是不停的从三张图片中切换显示的状态

![](http://i1.bvimg.com/673108/553aa26b5e284dfct.jpg)![](http://i1.bvimg.com/673108/553aa26b5e284dfct.jpg)

![](http://i1.bvimg.com/673108/56d2d459ed427c81t.jpg)![](http://i1.bvimg.com/673108/56d2d459ed427c81t.jpg)

![](http://i1.bvimg.com/673108/0fd9a3634de0f09bt.jpg)![](http://i1.bvimg.com/673108/0fd9a3634de0f09bt.jpg)

图片激活状态

![](http://i1.bvimg.com/673108/3d7d31e959c71c7d.png)![](http://i1.bvimg.com/673108/3d7d31e959c71c7d.png)

```typescript
update(){
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
}
```

### 通过轮播图的模式实现背景的移动

![](http://i1.bvimg.com/673108/4f8df22abc1ccd80.jpg)![](http://i1.bvimg.com/673108/4f8df22abc1ccd80.jpg)

```typescript
    bgMove(bg:cc.Node){
        bg.x -= 1;
        if (bg.x < -288){
            bg.x += 288*2
        }
    }
```

### 小鸟重力加速度

```typescript
speed: number = 0;

update(){
    this.speed -= 0.05;

    this.birdParent.y += this.speed; //小鸟下落, 模拟重力加速度
}
```

### 屏幕点击事件

创建butten 把文字和背景都删掉, 寛高调到和scene一样

然后把button代理上main里面写的事件

![](http://i1.bvimg.com/673108/05f7520dcff7ad97.jpg)![](http://i1.bvimg.com/673108/05f7520dcff7ad97.jpg)

```typescript
    onButtonClick() {
        this.speed = 2.5;//屏幕点击时小鸟往上走
    }
```

### 碰撞事件

```typescript
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

    update(){
        this.checkCollision(this.birdParent, this.pipeParent0);

        this.checkCollision(this.birdParent, this.pipeParent1);
        this.checkCollision(this.birdParent, this.pipeParent2);

    }
```

### 小鸟旋转

```typescript
update(){
    // this.birdParent.rotation = -this.speed * 10; 小鸟的旋转角度
    this.birdParent.angle = this.speed * 10; //小鸟的旋转角度, 新版
}
```

### 记录得分

新建一个label

**这里有个BUG就是自定义字体无效**

![](http://i2.bvimg.com/673108/ccbfddef9a1e42b9.jpg)![](http://i2.bvimg.com/673108/ccbfddef9a1e42b9.jpg)

然后把label 绑定到controller

```typescript
    @property(c
    c.Label)
    lbScore: cc.Label = null;

    score: number = 0; //得分


        pipeMove(pipe: cc.Node) {
        pipe.x -= 3;
        if (pipe.x < -144 - 26) {  //从中心点开始计算 背景的一半+上自身的一半
            pipe.x += (288 + 52);  //移出屏幕外面
            pipe.y = Math.random() * 50;  //让管道每次随机上下移动
            this.score += 1; // 得分加1
            this.lbScore.string = this.score.toString();
            console.log(this.lbScore.string)
        }
```

### 游戏流程实现
