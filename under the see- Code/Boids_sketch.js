// --- code for boids ---
let flock;

let TimeAtPress;

let numBoids1 = 70;
let numBoids2 = 40;
let numBoids3 = 20;

let boidTarget1;
let boidTarget2;
let boidTarget3;

let ballSpeedX = 2;
let ballSpeedY = 3;

function setupBoids() {
    boidTarget1 = {x: 200, y: 200};
    boidTarget2 = {x: 400, y: 400};
    boidTarget3 = {x: 600, y: 600};

    flock = new Flock();
    for (let i = 0; i < numBoids1; i++) {
        let boid = new Boid(width / 2, height / 2, boidTarget1, fishtype.lille);
        flock.addBoid(boid);
    }
    flock2 = new Flock();
    for (let i = 0; i < numBoids2; i++) {
        let boid = new Boid(width / 2, height / 2, boidTarget2, fishtype.mellem);
        flock2.addBoid(boid);
    }



}

function drawBoids(level, positions) {
    flock.run();
    flock2.run();

    

    // makes the ball invisible. and makes it bounce around.
    fill(0, 0, 0, 0);
    noStroke();
    ellipse(boidTarget1.x, boidTarget1.y, 50, 50);

    boidTarget1.x += ballSpeedX;
    boidTarget1.y += ballSpeedY;

    if (boidTarget1.x > width - 25 || boidTarget1.x < 25) {
        ballSpeedX *= -1;
    }
    if (boidTarget1.y > height - 25 || boidTarget1.y < 25) {
        ballSpeedY *= -1;
    }

    ellipse(boidTarget2.x, boidTarget2.y, 50, 50);

    boidTarget2.x += ballSpeedX;
    boidTarget2.y += ballSpeedY;

    if (boidTarget2.x > width - 25 || boidTarget2.x < 25) {
        ballSpeedX *= -1;
    }
    if (boidTarget2.y > height - 25 || boidTarget2.y < 25) {
        ballSpeedY *= -1;
    }

    // --- very messy code for now ---

    // makes the boids flee
    for (let i = flock.boids.length - 1; i >= 0; i--) {
        let b = flock.boids[i];
        if (positions) {
            // im using the same number as earlier, ther must be a better way to do this. but it works for now.
            let closeMouth = dist(
                positions[57][0], positions[57][1],
                positions[60][0], positions[60][1]
                );
            // now i activaetes when the mouth is open and the sound level is high. 0.01 we consider yelling.
            if (closeMouth >= 10 && level > 0.001) {
                let mouthX = mirrorX((positions[57][0] + positions[60][0]) / 2);
                let mouthY = (positions[57][1] + positions[60][1]) / 2;
                TimeAtPress = frameCount;
                let distance = dist(mouthX, mouthY, b.position.x, b.position.y);
                if (distance < 200) {
                    let direction = createVector(b.position.x - mouthX, b.position.y - mouthY);
                    direction.normalize();
                    direction.mult(6); // flee speed
                    b.velocity.add(direction);
                }
                // removes boids outside the canvas but only if the have been scared by the mouse click.)
                // it uses framecount so that only the boids that have been scared by the mouse click are removed.
                if (b.position.x > width || 
                    b.position.x < 0 || 
                    b.position.y > height ||
                    b.position.y < 0 &&
                    frameCount - TimeAtPress > 60) {
                flock.boids.splice(i, 1);
                }
            }
        }
    }

    // makes the boids flee
    for (let i = flock2.boids.length - 1; i >= 0; i--) {
        let b = flock2.boids[i];
        if (positions) {
            // im using the same number as earlier, ther must be a better way to do this. but it works for now.
            let closeMouth = dist(
                positions[57][0], positions[57][1],
                positions[60][0], positions[60][1]
                );
            // now i activaetes when the mouth is open and the sound level is high. 0.01 we consider yelling.
            if (closeMouth >= 10 && level > 0.001) {
                let mouthX = mirrorX((positions[57][0] + positions[60][0]) / 2);
                let mouthY = (positions[57][1] + positions[60][1]) / 2;
                TimeAtPress = frameCount;
                let distance = dist(mouthX, mouthY, b.position.x, b.position.y);
                if (distance < 200) {
                    let direction = createVector(b.position.x - mouthX, b.position.y - mouthY);
                    direction.normalize();
                    direction.mult(6); // flee speed
                    b.velocity.add(direction);
                }
                // removes boids outside the canvas but only if the have been scared by the mouse click.)
                // it uses framecount so that only the boids that have been scared by the mouse click are removed.
                if (b.position.x > width || 
                    b.position.x < 0 || 
                    b.position.y > height ||
                    b.position.y < 0 &&
                    frameCount - TimeAtPress > 60) {
                flock2.boids.splice(i, 1);
                }
            }
        }
    }
}