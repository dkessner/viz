//
// particle.js
//


class Particle {
    constructor(position, velocity, acceleration, radius, color) {
        this.position = position.copy();
        this.velocity = velocity.copy();
        this.acceleration = acceleration.copy();
        this.radius = radius;
        this.color = color;
        this.dead = false;
    }

    display(pg) {
        pg.noStroke();
        pg.fill(this.color);
        pg.ellipse(this.position.x, this.position.y, 2*this.radius, 2*this.radius);

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);

        const threshold = 2000*2000;
        if (this.position.magSq() > threshold)
            this.dead = true;
    }
}


