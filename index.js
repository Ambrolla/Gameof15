let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let gameBoardCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //array of numbers in a game
let clickPos;

// To randomize numbers
for (let i = gameBoardCells.length; i; i--) {
    let randomized = Math.floor(Math.random() * i);
    [gameBoardCells[i - 1], gameBoardCells[randomized]] = [gameBoardCells[randomized], gameBoardCells[i - 1]];
}

// Game Canvas Style:
function drawBoard(x, y, val) {
    ctx.font = "bold 60px Sans";
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 100, 100);
    if (val === 0) {
        ctx.fillStyle = "#E6CCA9"
    } else {
        ctx.fillStyle = "#AA4A30"
    }
    ctx.fillRect(x + 5, y + 5, 90, 90);
    ctx.fillStyle = "#E6CCA9";
    if (val < 10) {
        ctx.fillText(val, x + 35, y + 70)
    } else {
        ctx.fillText(val, x + 15, y + 70)
    }
}

function drawCells(pos, val) {
    const x = (pos % 4 !== 0) ? ((pos - 1) % 4) * 100 + 100 : 0;
    const y = Math.floor(((pos % 4 !== 0) ? (pos - 1) : (pos)) / 4) * 100;
    drawBoard(x, y, val);
}

//To show all numbers:
function showAllNumbers() {
    for (let i = 0; i <= 15; i++) {
        drawCells(i, gameBoardCells[i]);
    }
}
showAllNumbers();

///When you click on a number:
canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseClickX = event.clientX - rect.left;
    const mouseClickY = event.clientY - rect.top;
    //ternary operator:
    if (mouseClickY < 110) {
        clickPos = (mouseClickX < 110) ? 0 : (mouseClickX < 210) ? 1 : (mouseClickX < 310) ? 2 : 3;
    } else if (mouseClickY > 110 && mouseClickY < 210) {
        clickPos = (mouseClickX < 110) ? 4 : (mouseClickX < 210) ? 5 : (mouseClickX < 310) ? 6 : 7;
    } else if (mouseClickY > 210 && mouseClickY < 310) {
        clickPos = (mouseClickX < 110) ? 8 : (mouseClickX < 210) ? 9 : (mouseClickX < 310) ? 10 : 11;
    } else if (mouseClickY > 310 && mouseClickY < 410) {
        clickPos = (mouseClickX < 110) ? 12 : (mouseClickX < 210) ? 13 : (mouseClickX < 310) ? 14 : 15;
    }

    if (gameBoardCells[clickPos - 4] === 0) {

        gameBoardCells[clickPos - 4] = gameBoardCells[clickPos]
        gameBoardCells[clickPos] = 0
        showAllNumbers();
    } else if (gameBoardCells[clickPos + 4] === 0) {

        gameBoardCells[clickPos + 4] = gameBoardCells[clickPos]
        gameBoardCells[clickPos] = 0
        showAllNumbers();
    } else if (gameBoardCells[clickPos + 1] === 0 && clickPos !== 3
        && clickPos !== 7 && clickPos !== 11) {

        gameBoardCells[clickPos + 1] = gameBoardCells[clickPos]
        gameBoardCells[clickPos] = 0
        showAllNumbers();
    } else if (gameBoardCells[clickPos - 1] === 0 && clickPos !== 4
        && clickPos !== 8 && clickPos !== 12) {

        gameBoardCells[clickPos - 1] = gameBoardCells[clickPos]
        gameBoardCells[clickPos] = 0
        showAllNumbers();
    }
});