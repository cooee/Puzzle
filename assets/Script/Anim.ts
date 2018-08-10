// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import mxf = require("./mxf/init");
const {ccclass, property} = cc._decorator;

@ccclass
export class Anim extends cc.Component {


    onLoad () {
        mxf.event.on("gameOver",function(params) {
            this.gameOver(params);
        }.bind(this))

        mxf.event.on("gameStart",function(params) {
            this.node.active = false;
        }.bind(this))


    }

    onAnimCompleted(num, string) {
        mxf.event.emit("gameStart","开始游戏");
    }
    gameOver (tips) {
        this.node.active = true;
        this.getComponent(cc.Label).string = tips;
        mxf.dump("2222222222222222222222222222222222222222222222222")
    }

    // update (dt) {}
}
