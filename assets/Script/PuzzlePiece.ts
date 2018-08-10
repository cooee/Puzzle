const { ccclass, property } = cc._decorator;

@ccclass
export class Piece extends cc.Component {

    // @property(cc.Texture2D)
    // public texture: cc.Texture2D = null;

    // public index
    public index: number = 0;

    public init(row: number, col: number, colNum: number, texture:cc.Texture2D) 
    {
        this.index = 0;
        let sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        let rect = sprite.spriteFrame.getRect();
        let newRectWidth = rect.width / colNum;
        let newRectHeight = rect.height / colNum;

        let newRectX = col * newRectWidth;
        let newRectY = (colNum - row - 1) * newRectHeight;

        
        let newRect = cc.rect(newRectX, newRectY, newRectWidth, newRectHeight);
        sprite.type = cc.Sprite.Type.TILED;
        sprite.spriteFrame.setRect(newRect);
       
        // console.log(newRect)

        this.node.width = newRectWidth;
        this.node.height = newRectHeight;
        
    }

}