//
// Scene_AudioInfo.js
//


class Scene_AudioInfo extends Scene {
    name() {return "Audio Info";}

    initialize(pg) {
        this.particles = []
    }

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
        const meterWidth = pg.width * .05;
        const meterHeight = pg.height * .5;

        // draw meter outline

        pg.noFill();
        pg.stroke(255);
        pg.rect(x0, y0, meterWidth, meterHeight);

        pg.stroke(255);
        for (let i=0; i<=10; i++) {
            let y = y0 + meterHeight - map(i, 0, 10, 0, meterHeight);
            pg.line(x0, y, x0 + meterWidth*.2, y);
        }

        // draw level

        let level = audioIn ? audioIn.getLevel() : 0;
        let meterLevel = map(level, 0, 1, 0, meterHeight);

        pg.fill(0, 255, 0);
        pg.noStroke();
        let yMeter = y0+meterHeight-meterLevel;
        pg.rect(x0, yMeter, meterWidth, meterLevel);

        // create and display particles

        this.particles.push(new Particle(createVector(x0+meterWidth, yMeter), 
                                        createVector(2, 0),
                                        createVector(0, 0),
                                        1, 
                                        color(255)));
        for (let p of this.particles) {
            p.display(pg);
            if (p.position.x > pg.width * .9)
                p.dead = true;
        }


        pg.stroke(0, 255, 0);
        pg.strokeWeight(2);

        for (let i=0; i<this.particles.length-1; i++) {
            let x0 = this.particles[i].position.x;            
            let x1 = this.particles[i+1].position.x;            
            let y0 = this.particles[i].position.y;            
            let y1 = this.particles[i+1].position.y;            
            pg.line(x0, y0, x1, y1);
        }

        //pg.stroke(128);
        //pg.text("Particles: " + this.particles.length, x0 + meterWidth*2, y0);

        // kill dead particles

        for (let i=this.particles.length-1; i>=0; i--) {
            if (this.particles[i].dead) {
                this.particles.splice(i, 1);
            }
        }

    }

    particles;
}


