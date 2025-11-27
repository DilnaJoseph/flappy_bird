// src/Game.js
import { Bird } from './Bird.js';

// --- INITIALIZATION ---

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgroundImage = new Image();
// NOTE: Paths are relative to index.html when served by the browser
backgroundImage.src = 'assets/images/flappy-bg.jpg';

// Instantiate the Bird object
const bird = new Bird(
    100, // x
    canvas.height / 2, // y (start in center)
    10, // radius
    '#FF0000', // color
    40, // width
    30, // height
    'assets/images/flappy-bird.png' // imagePath
);

// --- WINDOW AND RESIZE HANDLERS ---

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw the background immediately after resize
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    // Update bird's starting Y if canvas height changed drastically
    if (bird) { 
        bird.y = canvas.height / 2;
    }
}

// Initial setup and handling resize
backgroundImage.onload = function () {
    resize();
    gameloop(); // Start the loop only once the background is loaded
}
window.addEventListener('resize', resize);


// --- GAME LOOP ---

function gameloop() {
    // 1. CLEAR AND DRAW BACKGROUND
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // 2. UPDATE GAME OBJECTS (Physics/Movement)
    bird.update(); // Update the bird's position

    // 3. DRAW GAME OBJECTS
    bird.draw(ctx); // Draw the bird using the context
    
    // 4. LOOP
    requestAnimationFrame(gameloop);
}

// No need to call flap() or gameloop() here, they are called inside the Bird constructor and backgroundImage.onload