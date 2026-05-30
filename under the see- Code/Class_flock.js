class Flock {
    // the Flock class represents the entire system of boids. 
    // It is essentially a container for all the boids in the system.
    // it also has a method for updating and displaying all the boids.
    constructor() {
        this.boids = [];
    }

    run() {
        for (let boid of this.boids) {
            // Each Boid object must know about all the other boids.
            boid.run(this.boids);
        }
    }

    addBoid(boid) {
        this.boids.push(boid);
    }
}