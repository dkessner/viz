//
// viz.js
//


let mic;


function setup() {

  createCanvas(windowWidth, windowHeight);

  // some browsers (e.g. Chrome) require user interaction before 
  // allowing initialization of an audio context
  getAudioContext().suspend();
}


function initializeMicrophone() {
  userStartAudio(); // starts audio context
  mic = new p5.AudioIn();
  mic.start();
}


function draw() {
  background(0);

  fill(255);
  text("audio context state: " + getAudioContext().state, 50, 50);

  let vol = 0;

  if (mic) {
      vol = mic.getLevel(); // in [0,1]
  }

  let h = map(vol, 0, 1, 0, height/2);
  fill(127);
  stroke(255);
  ellipse(width/2, height/2 - h, 50, 50);
}


function keyPressed() {
    if (key === 'f') {
        // TODO: weird behavior (2 presses?)
        let fs = fullscreen();
        fullscreen(!fs);
    }
}


function mousePressed() {
    initializeMicrophone();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


