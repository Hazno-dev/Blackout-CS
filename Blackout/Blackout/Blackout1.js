//Variables

let forward;
let left;
let right;
let back;
let logo;
let heart;
let pressl;
let pressr;
let pressf;
let pressb;
let start = false;
let button;
let transition;
let health;
let map;
let hud = {
    health: 3,
    blackout: undefined,
    map: undefined,
    torches: undefined
};

function preload() {
    forward = loadImage('MinerFor.png',);
    left = loadImage('Minerleft.png',);
    right = loadImage('Minerright.png',);
    back = loadImage('Minerback.png',);
    logo = loadImage('logo.png',);
    heart = loadImage('Health.png');
    map = loadImage('Map.png');
}


function setup() {
    let canv = createCanvas(displayWidth/2, displayHeight/2);
    canv.position(displayWidth/4, displayHeight*0.3);
    button = createButton('Start Game');
    button.position(width*0.9, height * 1.2);
    button.size(200,50);
    button.style("font-size", "30px");
    button.style("text-align", "left");
    button.style("font-family", "Courier New")
    button.mousePressed(buttonstart);
    frameRate(60);
}
function buttonstart() {
    userStartAudio();
    button.hide();
    transition = true;
    start = undefined;
}

function mousePressed(){
    
}

function keyPressed() {
    if (keyCode === LEFT_ARROW){
        pressl = true;
        pressr = false;
        pressf = false;
        pressb = false;
    }
    if (keyCode === RIGHT_ARROW){
        pressl = false;
        pressr = true;
        pressf = false;
        pressb = false;
    }
    if (keyCode === DOWN_ARROW){
        pressl = false;
        pressr = false;
        pressf = false;
        pressb = true;
    }
    if (keyCode === UP_ARROW){
        pressl = false;
        pressr = false;
        pressf = true;
        pressb = false;
    }
}

function WhiteFadeIn(){
    fill(255, 255, 255, fade);
    rectMode(CORNERS);
    rect(0, 0, width, height);
    if (fade<255) fade++;
    else fade = 0;
}

function WhiteFadeOut(a, b, c, d){
    fill(255, 255, 255, fade);
    rectMode(CORNERS);
    rect(a, b, c, d);
    if (fade>0) fade--;
}
function fall(){
    fill(255);
    rectMode(CORNERS);
    rect(0, 0, width/8, height);
    imageMode(CENTER);
    scale(1, -1);
    image(back, width/10, heightoffall);
    heightoffall -= height * 0.01;
}

// draw canvas
let fade = 0;
let intro = [];
let heightoffall = 0;
function draw() {
    // logo
    if (start === false){
        background(0);
        imageMode(CENTER);
        image(logo, width/2, height/4);
    }
    //fade
    if (transition){
        fill(255, 255, 255, fade);
        rectMode(CORNERS);
        rect(0, 0, width, height);
        if (fade<255) fade++;
        else {
            transition = false;
            intro[0] = true;
            intro[1] = true;
        }
    }
    //intro
    if (intro[0]){
        if (intro[1]){
            noStroke();
            textSize(32);
            fill(0);
            textAlign(CENTER)
            textFont('Courier New')
            text('A Young Miner Falls Into A Cave...', width/2, height/4);
            WhiteFadeOut(0, 0, width, height);
            if (fade === 0){
                intro[1] = false;
                intro[2] = true;
                intro[4] = true;
                fade = 255;
            }
        }
        if (intro[2]) {
            textSize(32);
            fill(0);
            textAlign(CENTER)
            textFont('Courier New')
            text('Guide Them Out', width / 2, height / 2);
            WhiteFadeOut(0, height/3, width, height);
            if (fade === 0){
                intro[2] = false;
                intro[3] = true;
                fade = 255;
            }
        }
        if (intro[3]) {
            noStroke();
            textSize(32);
            fill(0);
            textAlign(CENTER)
            textFont('Courier New')
            text('Before The Blackout', width / 2, height / 1.3);
            WhiteFadeOut(0, height/ 1.5, width, height);
            if (fade === 0) {
                intro[3] = false;
                intro[4] = false;
                intro[5] = true;
            }
        }
        if (intro[4]) fall(); 
        if (intro[5]) {
            fill(0, 0, 0, fade);
            rectMode(CORNERS);
            rect(0, 0, width, height);
            if (fade<155) fade++;
            else {
                intro[5] = false;
                start = true;
            }
        }
       
    }
    if (start) {
        imageMode(CENTER);
        rectMode(CORNERS);
        noStroke();
        fill(110);
        rect(0, 0, width, height);
        fill(0);
        rect(width * 0.01, height * 0.02, width * 0.99, height * 0.98);
        fill(255);
        rect(width * 0.013, height * 0.023, width * 0.987, height * 0.977);
        if (pressl === true) {
            image(left, width * 0.45, height * 0.6);
        }
        if (pressr === true) {
            image(right, width * 0.45, height * 0.6);
        }
        if (pressf === true) {
            image(forward, width * 0.45, height * 0.6);
        }
        if (pressb === true) {
            image(back, width * 0.45, height * 0.6);
        }
        fill(0);
        rect(width * 0.03, height * 0.8, width * 0.97, height * 0.95);
        fill(110);
        rect(width * 0.032, height * 0.804, width * 0.967, height * 0.946);
        fill(0);
        rect(width * 0.037, height * 0.81, width * 0.963, height * 0.94);
        fill(255);
        rect(width * 0.04, height * 0.814, width * 0.96, height * 0.934);
        image(heart, width * 0.08, height * 0.87);
        fill(0)
        rect(width * 0.12, height * 0.925, width * 0.3, height * 0.825);
        fill(110);
        rect(width * 0.123, height * 0.92, width * 0.297, height * 0.83);
        fill(255);
        if (hud.health === 3) {
            rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
            rect(width * 0.185, height * 0.91, (width * 0.23), height * 0.84);
            rect(width * 0.24, height * 0.91, (width * 0.287), height * 0.84);
        }
        if (hud.health === 2) {
            rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
            rect(width * 0.185, height * 0.91, (width * 0.23), height * 0.84);

        }
        if (hud.health === 1) {
            if (frameCount % 60 > 30) {
                fill(110);
                rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
            }
            else rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
        }
        image(map, width * 0.35, height * 0.87);
    }
}