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
    }

    display(pg) {
        pg.noStroke();
        pg.fill(this.color);
        pg.ellipse(this.position.x, this.position.y, 2*this.radius, 2*this.radius);

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }
}


