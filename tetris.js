const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const colors = ["tomato", "skyblue", "limegreen", "rebeccapurple", "gold"];

const container = Array(10)
    .fill(0)
    .map(() => Array(20).fill(0));

let block = new Block(random(2), random(4), 2 + random(3), 0, colors[random()])

updateCanvas();
setInterval(() => {
    saveLastMove();
    moveDown();
    updateCanvas();
}, 1000);

window.addEventListener("keydown", (e) => {
    saveLastMove();
    e.keyCode == 40 && moveDown();
    e.keyCode == 39 && moveRight();
    e.keyCode == 37 && moveLeft();
    e.keyCode == 38 && rotate();
    updateCanvas();
});
