//
// Scene.js
//


class Scene {
    name() {return "Unknown";}
    display(pg) {pg.background(0);}
}


class Scene_Black extends Scene {
    name() {return "Black";}
    display(pg) {pg.background(0);}
}


class Scene_Particles extends Scene {
    constructor() {
        super();
        this.particles = [];
    }

    name() {return "Particles";}

    display(pg, audioIn) {
        pg.background(0);

        const threshold = .017;
        let level = audioIn ? audioIn.getLevel() : 0;

        if (level > threshold) {
            let rate = map(level, 0, 1, 0, 5);
            this.createParticles(pg, rate);
        }

        for (let p of this.particles)
            p.display(pg);

        for (let i=this.particles.length-1; i>=0; i--) {
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }

        pg.fill(128);
        pg.noStroke();
        pg.textSize(pg.height/40);
        pg.text("particle count: " + this.particles.length, 50, 50);
    }

    createParticles(pg, rate) {
        if (rate < 1 && random()<rate)
            this.createParticle(pg);

        for (let i=0; i<rate; i++)
            this.createParticle(pg);
    }

    createParticle(pg) {
        let position = createVector(pg.width/2, pg.height/2);
        let velocity = p5.Vector.fromAngle(random(5*PI/4, 7*PI/4));
        velocity.setMag(random(3, 7));
        let acceleration = createVector(0, .1);
        let radius = random(3, 10);
        let c = color(random(256), random(256), random(256));
        let p = new Particle(position, velocity, acceleration, radius, c);
        this.particles.push(p);
    }
} // class Scene_Particles 


class Scene_Quad extends Scene {
    constructor(pg, child) {
        super();
        this.child = child;
        this.mypg = createGraphics(pg.width/2, pg.height/2);
    }

    name() {return "Quad";}

    child;
    mypg;

    display(pg, audioIn) {
        pg.background(0);

        this.child.display(this.mypg, audioIn);

        pg.image(this.mypg, 0, 0);
        pg.image(this.mypg, width/2, 0);
        pg.image(this.mypg, width/2, height/2);
        pg.image(this.mypg, 0, height/2);
    }
}



