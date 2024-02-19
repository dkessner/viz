//
// scene.js
//


class Scene {
    name() {return "Unknown";}
    display() {}
}


class Scene_Black extends Scene {
    name() {return "Black";}
    display() {background(0);}
}


class Scene_AudioInfo {
    name() {return "Audio Info";}
    display(audioIn) {
        background(0);
        fill(255);
        noStroke();
        textSize(32);

        let dy = 50;
        let y = dy;
        text("Audio context state: " + getAudioContext().state, 50, y+=dy);

        let level = audioIn ? audioIn.getLevel() : 0;
        text("Level: " + level.toFixed(2), 50, y+=dy);

        let r = map(level, 0, 1, width/10, width/4);
        fill(0, 0, 255);
        stroke(255);
        ellipse(width/2, height/2, r*2, r*2);
    }
}

class Scene2 extends Scene {
    display() {
        background(0, 0, 255);
    }
}


