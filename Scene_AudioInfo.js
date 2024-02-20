//
// Scene_AudioInfo.js
//


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
        const meterWidth = pg.width * .05;
        const meterHeight = pg.height * .5;

        pg.noFill();
        pg.stroke(255);
        pg.rect(x0, y0, meterWidth, meterHeight);

        let level = audioIn ? audioIn.getLevel() : 0;
        let meterLevel = map(level, 0, 1, 0, meterHeight);

        pg.fill(0, 255, 0);
        pg.noStroke();
        pg.rect(x0, y0+meterHeight-meterLevel, meterWidth, meterLevel);

        pg.stroke(255);
        for (let i=0; i<=10; i++) {
            let y = y0 + meterHeight - map(i, 0, 10, 0, meterHeight);
            pg.line(x0, y, x0 + meterWidth*.2, y);
        }
    }
}


