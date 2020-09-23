const skyDom = document.querySelector(".sky"); //获取天空dom元素
const skyStyles = getComputedStyle(skyDom); //获取天空dom元素的样式
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom); //super() 函数是用于调用父类(超类)的一个方法。
    }

    onMove() { //天空背景要还原
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}