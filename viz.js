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



