const { ccclass, property } = cc._decorator;

@ccclass
export class Test extends cc.Component {

    // @property(cc.Texture2D)
    // public texture: cc.Texture2D = null;

    // public index
    public index: number = 0;

    public init(row: number, col: number, colNum: number) 
    {
        this.index = 0;
        let sprite = this.node.getComponent(cc.Sprite);
        // sprite.spriteFrame = new cc.SpriteFrame(texture);

        let rect = sprite.spriteFrame.getRect();
        let newRectWidth = rect.width / colNum;
        let newRectHeight = rect.height / colNum;

        let newRectX = col * newRectWidth;
        let newRectY = (colNum - row - 1) * newRectHeight;

        
        let newRect = cc.rect(newRectX, newRectY, newRectWidth, newRectHeight);
        // sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame.setRect(newRect);
       
        console.log(newRect)

        this.node.width = newRectWidth;
        this.node.height = newRectHeight;
        
    }

    onLoad() {
        this.init(0,0,3);
    }

}