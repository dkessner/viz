//
// viz.js
//



let scenes = [];
let current = 0;

let audioIn;


function setup() {
  createCanvas(windowWidth, windowHeight);

  scenes.push(new Scene_Black());
  scenes.push(new Scene_AudioInfo());
  scenes.push(new Scene2());
}


function initializeAudioIn() {
  console.log("Initializing audio input.");
  userStartAudio();
  audioIn = new p5.AudioIn();
  audioIn.start();
}


function draw() {
    scenes[current].display(audioIn);

    fill(128);
    noStroke();
    textSize(32);
    text("Scene: " + current + " " + scenes[current].name(), 50, height-50);
}


function keyPressed() {
    if (!audioIn) initializeAudioIn();
    if (key === 'f') {
        // TODO: weird behavior (2 presses?)
        let fs = fullscreen();
        fullscreen(!fs);
    }

    number = parseInt(key);
    if (!isNaN(number) && number < scenes.length)
        current = number;
}


function mousePressed() {
    if (!audioIn) initializeAudioIn();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



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


