const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle { //水管类
    constructor(height, top, speed, dom) { //这些值要传参
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    onMove() {
        if (this.left < -this.width) {
            //移除dom
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min); //最低值 加上 最高值和最低值的差值乘随机数
}

class PipePare { //水管对
    constructor(speed) {
        this.spaceHeight = 150; //空隙位置的高度不变
        this.minHeight = 80; //水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight; //水管最小高度固定，确定最大高度



        const upHeight = getRandom(this.minHeight, this.maxHeight); //上水管高度

        const upDom = document.createElement("div"); //创建上水管dom
        upDom.className = "pipe up"; //给上水管加类名

        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管  调用水管类，填四个参数 上水管顶天，top为0



        const downHeight = landTop - upHeight - this.spaceHeight; //下水管高度

        const downTop = landTop - downHeight; //下水管距离顶部的top值为 游戏高度减去自身高度
        const downDom = document.createElement("div"); //创建下水管dom
        downDom.className = "pipe down"; //给下水管加类名

        this.downPipe = new Pipe(downHeight, downTop, speed, downDom) //下水管  调用水管类，填四个参数



        gameDom.appendChild(upDom) //appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
        gameDom.appendChild(downDom)
    }

    /**
     * 该柱子对是否已经移出了视野
     */

    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) { //柱子移动
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

/**
 * 用于不断的产生柱子对
 */
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500; //每产生柱子对的时间间隔
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            //移除掉用不到的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if (pair.useLess) {
                    //没用的柱子对
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}