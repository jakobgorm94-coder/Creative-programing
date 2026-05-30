
let motionFilter;
let lerpGrey = 200;
const startBoids = 110; // numBoids1 (70) + numBoids2 (40)
let backwardsMotionFilter;


function setup() {
    createCanvas(windowWidth, windowHeight);
    setupWebcam();
    setupBoids();
    setupMic();
    setupBubbles();

    setupCoral();
    setupSound()

}

function draw() {
    background(220);
    

    const positions = drawWebcam(); // saves the positions so we can use them in other sketches.
    const level = drawMic();    // saves the sound level so we can use it in other sketches.
    
    drawsand();
    drawBoids(level, positions);
    drawBubbles(positions);
    

    // --- blue filter ---
    waterFilter();

    // --- gray overlay ---
    const fishCount = flock.boids.length + flock2.boids.length;
    const grayFilter = map(fishCount, 0, startBoids, 200, 0);
    lerpGrey = lerp(lerpGrey, grayFilter, 0.1); // lerp function makes the change smoother.

    motionFilter = map(fishCount, 0, startBoids, 0, 1);
    backwardsMotionFilter = map(fishCount, 0, startBoids, 1, 0);
    

   
    noStroke();
    fill(120, lerpGrey);
    noStroke(); 
    rect(0, 0, width, height);

   
    drawCoral(500, height, motionFilter);
    drawCoral(1090, height+50, motionFilter);
    drawCoral(1000, height+90, motionFilter);
    drawCoral(1150, height+110, motionFilter);
    drawConch(width-100, height-100);
    drawConch(width-600, height-50);
    drawSound();
    drawCrab (50 * cos(frameCount * (0.1 + motionFilter * 0.4)) + width - 1400 + motionFilter * 600, height - 250);
    drawcave();

// image(soundimage, 200, 200, width/2, height/2)



}
// --- Gradient for the water ---
function waterFilter() {
    let startColor = color(0, 50, 240, 70); // blue
    let endColor = color(0, 50, 240, 100); // darker blue
    
    for (let y = 0; y < height; y++) {
        let amt = map(y, 0, height, 0, 1);
        let c = lerpColor(startColor, endColor, amt);
        stroke(c);
        line(0, y, width, y);
    }

}


