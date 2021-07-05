class Block {
    constructor(type, rotation, posX, posY, color) {
        this.type = type;
        this.rotation = rotation;
        this.position = {x: posX, y: posY};
        this.color = color;
        this.shape = shapes[type][rotation];
    }

    updateShape = () => (this.shape = shapes[this.type][this.rotation]);
}
