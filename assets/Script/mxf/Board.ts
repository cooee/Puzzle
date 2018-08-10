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

import mxf = require("./init");

@ccclass
export class Board extends cc.Component {

    @property(cc.Color)
    lineColor: cc.Color = new cc.Color(255,255,255);

    @property(cc.Integer)
    lineWidth: number = 2;


    private root: cc.Node = null;

    public showBox(isShow: boolean) {

        if (this.root == null) {
            let root = new cc.Node();
            this.node.addChild(root)
            let  graphics = root.addComponent(cc.Graphics);
            graphics.lineWidth = this.lineWidth;
            graphics.strokeColor = this.lineColor;
            graphics.rect(-this.node.width*this.node.anchorX,-this.node.height*this.node.anchorY, this.node.width,this.node.height);
            graphics.stroke();
            this.root = root;
        }
        this.root.active = isShow;
    
    }

    onLoad () {
        // this.showBox(true);
        mxf.dump("myc")
    }



    // start () {

    // }

    // update (dt) {}
}
