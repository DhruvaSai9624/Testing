// Setup canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100; // Adjust width and height as needed
canvas.height = window.innerHeight - 100;

// Global variables
let gameLoopInterval;
let playerCar = {
    x: canvas.width / 2 - 25, // Initial position
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 5, // Adjust initial speed
    fuel: 100, // Add fuel mechanic
};
let opponentCars = [];
let finishLine = canvas.width; // Adjust finish line position
let score = 0;
let gameOver = false;

// Initialize opponent cars
function createOpponentCar() {
    const car = {
        x: Math.random() * (canvas.width - 60) + 20, // Random lane
        y: -30, // Start off-screen
        width: 30,
        height: 20,
        speed: Math.random() * 6 + 3, // Varying speeds
    };
    opponentCars.push(car);
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player car
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerCar.x, playerCar.y, playerCar.width, playerCar.height);

    // Update and draw opponent cars
    for (let i = 0; i < opponentCars.length; i++) {
        const car = opponentCars[i];
        car.y += car.speed;

        // Handle collisions
        if (checkCollision(playerCar, car)) {
            // Implement collision effect or decrease player life/fuel
            playerCar.fuel -= 20;
            if (playerCar.fuel <= 0) {
                gameOver = true;
            }
        }

        // Remove cars that reach the bottom
        if (car.y > canvas.height) {
            opponentCars.splice(i, 1);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(car.x, car.y, car.width, car.height);
        }
    }

    // Track finish line crossing
    if (playerCar.x > finishLine) {
        score++;
        finishLine += 100; // Adjust finish line distance
        createOpponentCar();
    }

    // Display score and fuel
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Fuel: ${playerCar.fuel}`, 10, 50);

    // Game over check
    if (gameOver) {
        clearInterval(gameLoopInterval);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
    }

    // Handle player controls
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowLeft':
                playerCar.x -= playerCar.speed;
                break;
            case 'ArrowRight':
                playerCar.x += playerCar.speed;
                break;
        }
    });

}
