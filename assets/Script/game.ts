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

import mxf = require("./mxf/init");
import { Piece } from "./PuzzlePiece";
import { Board } from "./mxf/Board";

@ccclass
export default class Game extends cc.Component {

    @property(cc.Integer)
    row: number = 2;

    @property(cc.Integer)
    time: number = 30;

    @property(cc.Prefab)
    piece: cc.Prefab = null;

    @property(cc.SpriteFrame)
    spriteFrame:cc.SpriteFrame = null;

    @property(cc.Node)
    levelNode:cc.Node = null;

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private gameRoot: cc.Node = null;

    private rowH: number = 0;

    private select: number = 0;
    
    private arr:Array<cc.Node> = null;
    start () {

    }
    init() {
        if (this.gameRoot != null) {
            this.gameRoot.removeFromParent();
            this.gameRoot = null;
        }
 

        // this.selectBtnNode.active = true;

        let root = new cc.Node();
        this.gameRoot = root;
        // root.x = -100;
        root.anchorX = 0;
        root.anchorY = 0;

        var row = this.row;
       

        // var realUrl = cc.url.raw('resources/lena.png');
        let texture = this.spriteFrame.getTexture()

        // sprite.spriteFrame = new cc.SpriteFrame(this.texture);

        root.width = texture.width;
        root.height = texture.height;
        var rowW = root.width / row;
        var rowH = root.height / row;

        root.x = -root.width/2;
        root.y = -root.height/2;
        this.rowH = rowH;

        this.node.addChild(root);
        // root.addComponent("RectBox").showRect(true);

        let arr = new Array<cc.Node>();
        var index = 0;
        this.select = -1;

        // let newStar = cc.instantiate(this.piece);
        // // 将新增的节点添加到 Canvas 节点下面
        // let piece = newStar.getComponent(Piece);

        // piece.init(0,0,2,texture);


        // newStar.x = 0;
        // newStar.y = 0;

        // root.addChild(newStar);


        for (let i = 0; i < row; i++) {
            for (let j = 0; j < row; j++) {

                let newStar = cc.instantiate(this.piece);
                // 将新增的节点添加到 Canvas 节点下面
                let piece = newStar.getComponent(Piece);

                piece.init(i,j,row,texture);
       

                newStar.x = rowW * j;
                newStar.y = rowH * i;

                root.addChild(newStar);

                arr.push(newStar);

                piece.index = index;

                index = index + 1;
        
                newStar.on(cc.Node.EventType.TOUCH_END, function(event) {
                    
                    if (this.select == -1) {
                        this.select = event.target.getComponent(Piece).index;
                        
                        let board = event.target.getComponent(Board);
                        board.showBox(true);
                        event.target.zIndex = row*row;
                    } else {

                        var j = -1;
                        var k = -1;
                        for (let index = 0; index < this.arr.length; index++) {
                            const element = this.arr[index].getComponent(Piece);
                            console.log(element.index + " this.element");
                            if (element.index == this.select) {
                                k = index;
                            }
                            if (event.target.getComponent(Piece).index == element.index) {
                                j = index;
                            }  
                        }

                        if (k >=0 && j >= 0) {
                            this.arr[k].getComponent(Board).showBox(false);
                            this.arr[k].zIndex = k;
                            this.select = -1;
                            this.swap(this.arr,k,j)
                        }
                        if (this.check(this.arr) == true) {
                            mxf.event.emit("gameOver","恭喜过关");
                        }

                    }
                }, this);
                // list
            }
            
        }
        this.arr = arr;
        
    }
    

    swap (list,i,j) {
        
        

        var x = 0;
        var y = 0;
        var temp = list[i];

        list[i] = list[j]
        list[j] = temp;


        x = list[i].x;
        y = list[i].y;
    
        var x1 = list[j].x
        var y1 = list[j].y;
    
        list[j].x = x;
        list[j].y = y;

        list[i].x = x1;
        list[i].y = y1;

    }

    check (arr) {
        
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].getComponent(Piece).index != index) {
                return false;
            }
        }
        return true;
        
    }


    onLoad () {

        mxf.event.on("gameStart",function(params) {
            this.startGame()
            
        }.bind(this))

        mxf.event.on("gameOver",function(params) {
            this.gameOver(params)
        }.bind(this))

        this.init();
        // this.node.runAction()
        // this.startGame();


    }

    startGame () {

        this.levelNode.active = true;
        this.init();
        let arr = this.arr;
        mxf.event.emit("initTime",this.time);
        for (let index = 0; index < arr.length; index++) {
            
            var num=Math.floor(Math.random()*(arr.length-1)+1);
            this.swap(arr,index,num)
        }
    }


    gameOver (tips) {
        if (tips == "游戏失败") {
            var delay = 0;
            this.arr.forEach(element => {
                var newVec2 = element.convertToWorldSpace(cc.v2(element.x, element.y));
                mxf.dump(newVec2);
                var time = cc.delayTime(delay);

                var t = ((newVec2.y + this.rowH) / 200) * 0.25
                var mov = cc.moveBy(t, cc.p(0, -1 * newVec2.y - this.rowH)).easing(cc.easeCubicActionOut());
                var seq1 = cc.sequence(time, mov);
                element.runAction(seq1);
                // element.runAction(jumpUp)

                delay = delay + 0.15;
            });
        }
    }

    easyLevel (event) {
        this.row = 3;
        this.time = 30;
        mxf.event.emit("gameStart","开始游戏");
    }


    normalLeve() {
        this.row = 4;
        this.time = 40;
        mxf.event.emit("gameStart","开始游戏");
    }

    hardLevel() {
        this.row = 5;
        this.time = 50;
        mxf.event.emit("gameStart","开始游戏");
    }
    // update (dt) {}
}
