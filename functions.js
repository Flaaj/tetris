const updateCanvas = () => {
    checkForCollision();
    eliminateFullRows();
    clearCanvas();
    render();
    renderShape();
};

const rect = (x, y, color) => {
    const [width, height] = [40, 40];
    context.fillStyle = color ? color : "black";
    context.fillRect(1 + 42 * x, 1 + 42 * y, width, height);
};

const render = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {
            if (container[i][j] === 1) rect(i, j);
        }
    }
};

const renderShape = () =>
    block.shape.forEach(([x, y]) =>
        rect(block.position.x + x, block.position.y + y, block.color)
    );

const clearCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height);

const generateNewShape = () => {
    block = new Block(
        random(shapes.length),
        random(shapes[0].length),
        2 + random(3),
        0,
        colors[random()]
    );
};

const moveDown = () => block.position.y++ && (block.lastMove = "Down");
const moveRight = () => block.position.x++ && (block.lastMove = "Right");
const moveLeft = () => block.position.x-- && (block.lastMove = "Left");
const rotate = () => {
    block.rotation = (block.rotation + 1) % 4;
    block.updateShape();
    block.lastMove = "Rotate";
};
const unrotate = () => {
    block.rotation = (block.rotation + 3) % 4;
    block.updateShape();
};

const checkForCollision = () => {
    const [px, py] = [block.position.x, block.position.y];
    const pixels = block.shape.map(([x, y]) => [px + x, py + y]);

    for (let i = 0; i < 4; i++) {
        const [x, y] = pixels[i];

        if (x <= -1) {
            block.position.x = px + 1;
        } else if (x >= 10) {
            block.position.x = px - 1;
        }

        if (x <= -2) {
            block.position.x = px + 2;
            break;
        } else if (x >= 11) {
            block.position.x = px - 2;
            break;
        }

        if (
            y >= 20 ||
            (container[x] && container[x][y] && container[x][y] > 0)
        ) {
            if (block.lastMove === "Down") {
                addShapeToContainer();
                generateNewShape();
                break;
            } else if (block.lastMove === "Left") {
                moveRight();
                break;
            } else if (block.lastMove === "Right") {
                moveLeft();
                break;
            } else if (block.lastMove === "Rotate") {
                unrotate();
                break;
            }
        }
    }
};

const addShapeToContainer = () =>
    block.lastMovePixels.forEach(([x, y]) => {
        container[x][y] = 1;
    });

const eliminateFullRows = () => {
    for (let i = 0; i < 20; i++) {
        let j = 0;
        while (j < 10) {
            container[j][i] === 0 && (j = 11);
            j++;
        }
        if (j == 10) {
            delRow(i);
        }
    }
};

const delRow = (n) => {
    for (let i = 0; i < 10; i++) {
        container[i] = [0, ...container[i].filter((_, i) => i != n)];
    }
};

const saveLastMove = () => {
    const [px, py] = [block.position.x, block.position.y];
    block.lastMovePixels = block.shape.map(([x, y]) => [px + x, py + y]);
};

const random = (n = colors.length) => ~~(Math.random() * n);
