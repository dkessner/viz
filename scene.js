//
// scene.js
//


class Scene {
    name() {return "Unknown";}
    display(pg) {pg.background(0);}
}


class Scene_Black extends Scene {
    name() {return "Black";}
    display(pg) {pg.background(0);}
}


class Scene_AudioInfo {
    name() {return "Audio Info";}
    display(pg, audioIn) {
        pg.background(0);
        pg.fill(255);
        pg.noStroke();
        pg.textSize(32);

        let dy = 50;
        let y = dy;
        pg.text("Audio context state: " + getAudioContext().state, 50, y+=dy);

        let level = audioIn ? audioIn.getLevel() : 0;
        pg.text("Level: " + level.toFixed(2), 50, y+=dy);

        let r = map(level, 0, 1, width/10, width/4);
        pg.fill(0, 0, 255);
        pg.stroke(255);
        pg.ellipse(width/2, height/2, r*2, r*2);
    }
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



