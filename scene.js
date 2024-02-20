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

        this.displayText(pg, audioIn);
        this.displayBall(pg, audioIn);
        this.displayMeter(pg, audioIn);
    }

    displayText(pg, audioIn) {
        pg.fill(255);
        pg.noStroke();
        pg.textSize(pg.height/40);

        let dy = pg.height/20;
        let y = dy;
        pg.text("Audio context state: " + getAudioContext().state, 50, y+=dy);

        let level = audioIn ? audioIn.getLevel() : 0;
        pg.text("Level: " + level.toFixed(2), 50, y+=dy);
    }

    displayBall(pg, audioIn) {
        let level = audioIn ? audioIn.getLevel() : 0;
        let r = map(level, 0, 1, width/10, width/4);
        pg.fill(0, 0, 255);
        pg.stroke(255);
        pg.ellipse(width/2, height/2, r*2, r*2);
    }

    displayMeter(pg, audioIn) {

        let x0 = pg.width * .1;
        let y0 = pg.height * .25;
        let meterWidth = pg.width * .1;
        let meterHeight = pg.height * .5;

        pg.noFill();
        pg.stroke(255);
        pg.rect(x0, y0, meterWidth, meterHeight);

        let level = audioIn ? audioIn.getLevel() : 0;
        let meterLevel = map(level, 0, 1, 0, meterHeight);

        pg.fill(0, 255, 0);
        pg.noStroke();
        pg.rect(x0, y0+meterHeight-meterLevel, meterWidth, meterLevel);
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



