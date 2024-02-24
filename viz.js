//
// viz.js
//


let scenes = [];
let current = 0;

let audioIn, fft;


let pg;


function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();

    pg = createGraphics(windowWidth, windowHeight);

    scenes.push(new Scene_Black());
    scenes.push(new Scene_AudioInfo());
    scenes.push(new Scene_Particles());
    scenes.push(new Scene_Quad(pg, new Scene_Particles()));
}


function initializeAudioIn() {
    console.log("Initializing audio input.");
    userStartAudio();
    audioIn = new p5.AudioIn();
    audioIn.start();

    fft = new p5.FFT();
    fft.setInput(audioIn);
}


function draw() {
    background(0);

    scenes[current].display(pg, audioIn, fft);
    image(pg, 0, 0);

    fill(128);
    noStroke();
    textSize(height/30);
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
    if (!isNaN(number) && number < scenes.length) {
        current = number;
        scenes[current].initialize(pg);
    }
}


function mousePressed() {
    if (!audioIn) initializeAudioIn();

    current++;

    if (current >= scenes.length)
        current = 0;

    scenes[current].initialize(pg);

    return false;
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth, windowHeight);
}



