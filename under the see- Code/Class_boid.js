const fishtype = {
    lille: "lille",
    stor: "stor",
    mellem: "mellem"
}

class Boid {
    constructor(x, y, target, type) {
        this.target = target;
        this.type = type;
        // the Vehicle class’s motion is controlled through its position, velocity, and acceleration vectors.
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector();
        
        this.r = 3;

        this.maxForce = 0.05;
        this.maxSpeed = 4;
    }

    run(boids) {
        // The run method updates the boid’s position and displays it on the screen. 
        // It also applies the three rules of boids to the boid’s acceleration.
        this.flock(boids);
        this.update();
        this.show();
    }


    applyForce(force) {
        // Newton’s second law (skipping the math)
        this.acceleration.add(force);
    }

    flock(boids) {
        // these are the three rules of boids, which we will implement in the following functions:
        let alignment = this.align(boids);
        let cohesion = this.cohere(boids);
        let separation = this.separation(boids);

        // Weigh these forces
        alignment.mult(1.0);
        cohesion.mult(1.0);
        separation.mult(5.5);

        // Add the force vectors to acceleration
        this.applyForce(alignment);
        this.applyForce(cohesion);
        this.applyForce(separation);
    }   

    update() {
        //standard motion update: velocity changes by acceleration, position changes by velocity. 
        //After each update, we reset acceleration to 0 each cycle by multiplying it by 0.
        this.velocity.add(this.acceleration);
        let ballinfluence =0.1;
        this.velocity.limit(this.maxSpeed);
        // makes it so the boids are attractet to a ball.
        this.velocity.add(createVector(this.target.x - this.position.x, this.target.y - this.position.y).setMag(ballinfluence)); 
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    seek (target) {
        //Create a vector pointing from the position to the target at with the length of the maximum speed.
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
    
        //Steer is the desired velocity minus the current velocity. This is the amount of steering force 
        //needed to get from the current velocity to the desired velocity.
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);     //Limit to maximum steering force
        
        this.applyForce(steer);         //Apply the steering force to the acceleration.
        return steer;
    }

    show() {
        let angle = this.velocity.heading();

        if (this.type == fishtype.lille) {
            push();
            translate(this.position.x, this.position.y);
            rotate(angle);

            // Body
            fill(180, 220, 255);
            stroke(0);
            ellipse(0, 0, this.r * 4, this.r * 2);

            // Tail
            fill(150, 200, 240);
            triangle(-this.r * 2, 0, -this.r * 3, -this.r, -this.r * 3, this.r);
            pop();
        }
        if (this.type == fishtype.mellem) {
            push();
            translate(this.position.x, this.position.y);
            rotate(angle);

            //fin
            fill(255, 234, 0);
            stroke(0);
            beginShape();
            vertex(1.5 * this.r, 0);
            vertex(-0.5 * this.r, -1.5 * this.r);
            vertex(-2.5 * this.r, -2 * this.r);
            vertex(0, 0)
            endShape(CLOSE);

            fill(255, 234, 0);
            stroke(0);
            beginShape();
            vertex(1.5 * this.r, 0);
            vertex(-0.5 * this.r, 1.5 * this.r);
            vertex(-2.5 * this.r, 2 * this.r);
            vertex(0, 0)
            endShape(CLOSE);


            //Tail
            fill(255, 234, 0);
            stroke(0);
            beginShape();
            vertex(-1 * this.r, 0);
            vertex(-3.5 * this.r, 1.5 * -this.r);
            vertex(-2.8 * this.r, 0);
            vertex(-3.5 * this.r, 1.5 * this.r);
            endShape(CLOSE);
            
            //body
            fill(66, 69, 245);
            stroke(0);
            ellipse(0, 0, 3.5 * this.r, 2.5 * this.r);
            pop();
        }
        

    }

    separation(boids) {
        // For every nearby boid, calculate a vector pointing away from that neighbor
        let desiredSeparation = this.r * 5;
        let steer = createVector();
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < desiredSeparation) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++;
            }
        }

        if (count > 0) {
            steer.div(count);
        }

        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
    return steer;
    }
    
    align(boids) {
    // For every nearby boid in the system, calculate the average velocity
        let neighborDistance = this.r * 10;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < neighborDistance) {
                sum.add(boids[i].velocity);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxSpeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } 

        else {
            return createVector(0, 0);
        }
    }

    cohere(boids) {
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
        let neighborDistance = this.r * 10;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if (d > 0 && d < neighborDistance) {
                sum.add(boids[i].position); // Add location
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        } 
        else {
            return createVector(0, 0);
        }
    }

}