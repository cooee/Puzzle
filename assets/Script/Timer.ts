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
export class Timer extends cc.Component {

    @property(cc.Label)
    time: cc.Label = null;

    private intTime:number = 0;


    onLoad () {
        // this.getComponent(cc.ProgressBar).progress = 1;
        // let bar = this.getComponent(cc.ProgressBar);
        // bar.progress = 1;
        this.node.active = false;


        mxf.event.on("initTime",function(params) {
            // print(params)
            this.gameStart(params);
        }.bind(this))

        mxf.event.on("gameOver",function(params) {
            this.gameOver();
        }.bind(this))
    }

    gameOver () {
        this.unscheduleAllCallbacks();
    }


    gameStart (intTime) {
        this.getComponent(cc.ProgressBar).progress = 1;
        this.unscheduleAllCallbacks();
        this.node.active = true;
        var intTime = intTime;
        this.time.string = intTime
        this.intTime = intTime;
        var timeCallback = function (dt) {
            
            intTime = intTime - 1;
            this.time.string = intTime 
            let bar = this.getComponent(cc.ProgressBar);
            bar.progress = intTime / this.intTime;
            if (intTime <= 0) {
                mxf.event.emit("gameOver","游戏失败");
            }
            // cc.log("this.progress: " + this.progress);
        }.bind(this);
        this.schedule(timeCallback, 1,intTime-1);
        
    }

    // update (dt) {}
}
