let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let rows = 15;
let cols = 15;
let snake = [
    { x: 1, y: 7 }
];
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'RIGHT';
let foodCollected = false;
let update;
let prevDirection = 'LEFT';
const imgApple = new Image(cellWidth - 1, cellHeight - 1);
imgApple.src = './img/apfel.png';

placeFood();
draw();
document.addEventListener('keydown', keyDown);

function draw() {
    // Hintergrund
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let r=0; r<rows; r++)
      for (let c=0; c<cols; c++)
        

    // Snake
    ctx.fillStyle = 'green';
    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle = '#005000';
    add(snake[0].x, snake[0].y);

    // Essen
    ctx.fillStyle = 'red';
    addApple(food.x, food.y);

    requestAnimationFrame(draw);
}

function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function addApple(x, y) {
    let img = document.getElementById('imgApple');
    ctx.drawImage(imgApple, x * cellWidth + 3, y * cellHeight, cellWidth - 7, cellHeight - 1);
}

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function gameLoop() {
    testGameOver();
    if (foodCollected) {
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];

        if (snake.length - 1 == 5) {
            speed(200);
        } else if (snake.length - 1 == 8) {
            speed(185);
        } else if (snake.length - 1 == 12) {
            speed(170);
        } else if (snake.length - 1 == 18) {
            speed(155);
        } else if (snake.length - 1 == 24) {
            speed(140)
        }

        foodCollected = false;
        document.getElementById('foodCount').innerHTML = snake.length - 1;
    }

    shiftSnake();

    if (direction == 'LEFT' && prevDirection != 'RIGHT') {
        snake[0].x--;
    }
    if (direction == 'UP' && prevDirection != 'DOWN') {
        snake[0].y--;
    }
    if (direction == 'RIGHT' && prevDirection != 'LEFT') {
        snake[0].x++;
    }
    if (direction == 'DOWN' && prevDirection != 'UP') {
        snake[0].y++;
    }

    prevDirection = direction

    if (snake[0].x == food.x && snake[0].y == food.y) {
        foodCollected = true;

        // Futter neu platzieren
        placeFood();
    }
}

function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    food = {
        x: randomX,
        y: randomY
    }
}

function testGameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    if (snake[0].x < 0 || snake[0].x > cols - 1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart) {
        placeFood();
        snake = [
            { x: 1, y: 7 }
        ];
        direction = 'RIGHT';
        document.getElementById('foodCount').innerHTML = '0';
        document.getElementById('startText').innerHTML = 'Drücken Sie zum Starten die LEERTASTE';
        clearInterval(update);
    }
}

function keyDown(e) {
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
    if (e.keyCode == 32) {
        speed(300);
        document.getElementById('startText').innerHTML = '';
    }
}

function speed(interval) {
    clearInterval(update);
    update = setInterval(gameLoop, interval)
}

/* function changeSpeed() {
    let selectedSpeed = document.getElementById('changeSpeed').value;
    clearInterval(update);

    if (selectedSpeed === 'low') {
        update = setInterval(gameLoop, 300);
    } else if (selectedSpeed === 'normal') {
        update = setInterval(gameLoop, 170);
    } else if (selectedSpeed === 'fast') {
        update = setInterval(gameLoop, 145);
    }
} */