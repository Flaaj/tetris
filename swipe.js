//copied from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// window.addEventListener("touchdown", (e) => e.preventDefault());

document.addEventListener("touchstart", getTouchStart);

document.addEventListener("touchend", handleGesture);

function getTouchStart(e) {
    touchStartX = e.touches[0].screenX;
    touchStartY = e.touches[0].screenY;
};

function handleGesture(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    saveLastMove();
    swipedLeft() && moveLeft();
    swipedRight() && moveRight();
    swipedUp() && rotate();
    tapped() && moveDown();

    updateCanvas();
};

const swipedLeft = () => touchEndX + 30 < touchStartX;
const swipedRight = () => touchEndX > touchStartX + 30;
const swipedUp = () => touchEndY + 30 < touchStartY;
const tapped = () => Math.abs(touchEndY - touchStartY) < 2;
