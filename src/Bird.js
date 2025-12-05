// src/Bird.js

// Define bird properties using a class for better structure
export class Bird {
    constructor(x, y, radius, color, width, height, getCurrentState, gameState, imagePath) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.width = width;
        this.height = height;
        this.velocity = 2; // Initial fall velocity
        this.space = false; // Tracks spacebar state

        this.getCurrentState = getCurrentState; // Function to get current state
        this.gameState = gameState;

        // Load image asset
        this.image = new Image();
        // NOTE: Paths are relative to index.html when served by the browser
        this.image.src = imagePath; 

        this.flap(); // Set up the event listeners
    }

    // Existing function logic is now a class method
    draw(ctx) {
        // We will remove the circle later, but keeping it for now
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Rotation
        ctx.save();
        ctx.translate(this.x,this.y);
        let angle = this.velocity*0.05;
        ctx.rotate(angle);
        
        // Draw the image, centered on bird.x, bird.y
        ctx.drawImage(
            this.image, 
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        );
        ctx.restore();
    }

    // Handles the flap action (setting initial negative velocity)
    flap() {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.getCurrentState() === this.gameState.start) {
                this.space = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'Space') {
                this.space = false;
            }
        });
    }

    // Updates position based on velocity and gravity
    update() {
        if (this.space) {
            this.velocity = -10; // Flap up
        }
        
        this.y = this.y + this.velocity;
        
        // Simple gravity: if not the max terminal velocity (2), accelerate towards it
        if (this.velocity < 10) { // Setting a max terminal velocity of 10 for realism
             this.velocity = this.velocity + 2;
        }
    }
}
