//Variables
let counter = 0;
let angle = {
    one: 0,
    two: 0
}
let fade = 0;
let fadepro = 0;
let fadedark = 0;
let finalfade = {
    one: 0,
    two: 0
}
let floor = {
    one: undefined,
    two: undefined,
    three: undefined,
    four: undefined,
    five: undefined
}
let intro = [];
let heightoffall = 0;
let lost;
let forward;
let left;
let right;
let back;
let logo;
let pressl;
let pressr;
let pressf;
let pressb;
let start = false;
let button;
let transition;
let flooring;
var data;
let minigames = {
    Ingame1: undefined,
    Ingame2: undefined,
    Type1: undefined,
    Type2: undefined,
    StopGIm: undefined,
    StopGImBack: undefined,
    Spamspace: undefined,
    Count: 0,
    StopGSize: 0.5,
    FindPos: undefined,
    FindTrue: undefined
}
let item = {
    mapcountc: 0
}
let XYC = {
    XO: undefined,
    XY: undefined,
    YO: undefined,
    YF: undefined
}
let game = {
    current: undefined,
    currentc: undefined,
    px: undefined,
    py: undefined,
    level: [],
    X: undefined,
    Y: undefined,
    XO: undefined,
    YO: undefined,
    XF: undefined,
    YF: undefined,
    map: [],
    doors: undefined,
    gateim: undefined,
    gateimo: undefined,
    gates: undefined,
    orb: undefined,
    orbdead: undefined,
    orbback: undefined,
    finalring: undefined,
    finalsky: undefined,
    finallook: undefined,
    victory: false,
    name: undefined
}
let player = {
    dx: 0,
    dy: 0,
    for: undefined,
    forl: undefined,
    forr: undefined,
    left: undefined,
    right: undefined,
    back: undefined,
    backl: undefined,
    backr: undefined,
    gate1comp: undefined,
    gate2comp: undefined
}
class images {
    constructor(original, cloned) {
        this.original = original;
        this.cloned = cloned;
    }
}
let restart = {
    createb: undefined,
    button: undefined,
    yes: undefined
}
let backdrop;
let orb = {
    opened: undefined,
    spawn: undefined,
    b1: false,
    b2: false,
    b3: false
}
let maphud = {
    display: undefined,
    image: undefined,
    safe: undefined,
    unsafe: undefined,
    unknown: undefined,
    mapblock: []
}
let heart = new images(undefined, undefined);
let map = new images(undefined, undefined);
let torch = new images(undefined, undefined);
let eye = new images(undefined, undefined);
let hud = {
    health: 3,
    blackout: 30,
    map: 0,
    torches: 1
};
let canv;
let eyes = {
    y1: 0,
    y2: 0
}
// Image Loading - Sets all needed files and images to variables
function preload() {
    player.for = loadImage('MinerForward.png');
    player.forl = loadImage('MinerForwardL.png');
    player.forr = loadImage('MinerForwardR.png');
    player.left = loadImage('MinerLeft2.png');
    player.right = loadImage('MinerRight2.png');
    player.back = loadImage('MinerBack2.png');
    player.backl = loadImage('MinerBackL.png');
    player.backr = loadImage('MinerBackR.png');
    back = loadImage('Minerback.png',);
    logo = loadImage('logo.png',);
    heart.original = loadImage('Health.png');
    heart.cloned = loadImage('Health.png');
    map.original = loadImage('Map.png');
    map.cloned = loadImage('Map.png');
    torch.original = loadImage('Torch.png');
    torch.cloned = loadImage('Torch.png');
    eye.original = loadImage('Eye.png');
    eye.cloned = loadImage('Eye.png');
    flooring = loadImage('Floor.png');
    backdrop = loadImage('Backdrop.png');
    maphud.image = loadImage('MapBackdrop.png');
    maphud.safe = loadImage('Safe.png');
    maphud.unsafe = loadImage('Unsafe.png');
    maphud.unknown = loadImage('Unknown.png');
    game.gateim = loadImage('Gate.png');
    game.gateimo = loadImage('Gateopen.png');
    game.orb = loadImage('Orb.png');
    game.orbdead = loadImage('OrbConsumed.png');
    game.orbback = loadImage('BackOrb.png');
    game.finalring = loadImage('FinalRing.png');
    game.finalsky = loadImage('WakeSky.png');
    game.finallook = loadImage('WakeLook.png');
    floor.one = loadImage('Floor1.png');
    floor.two = loadImage('Floor2.png');
    floor.three = loadImage('Floor3.png');
    floor.four = loadImage('Floor4.png');
    floor.five = loadImage('Floor5.png');
    minigames.StopGIm = loadImage('Love.png');
    minigames.StopGImBack = loadImage('doorback.png');
    player.leftdark = loadImage('MinerLeft2Dark.png');
    data = loadJSON('Maps.json');
}
// Create Canvas - Creates the canvas
function setup() {
    canv = createCanvas(windowWidth/2, windowHeight/1.8);
    canv.position(windowWidth/4, windowHeight*0.3);
    button = createButton('Start Game');
    button.position(width*0.9, height * 1.2);
    button.size(200,50);
    button.style("font-size", "30px");
    button.style("text-align", "left");
    button.style("font-family", "Courier New")
    button.mousePressed(buttonstart);
    heart.cloned.resize(width * 0.07, height * 0.13);
    map.cloned.resize(width * 0.07, height * 0.13);
    frameRate(60);
}
//Start Button
function buttonstart() {
    userStartAudio();
    button.hide();
    transition = true;
    start = undefined;
    game.final = false;
    RandomGen();
}
//Restart Button
function restartmatch() {
    restart.button.hide();
    transition = true;
    start = undefined;
    lost = false;
    hud.map = 0;
    hud.torches = 1;
    hud.health = 3;
    game.final = false;
    RandomGen();
}
//Map Generation
function MapGen() {
    switch (game.current){
        case 0:
            game.X = (data.rooms[0].x);
            game.Y = (data.rooms[0].y);
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = 2;
            game.gates = 1;
            player.gate1comp = false;
            game.name = data.rooms[0].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            break;
        case 1:
            game.X = game.level[0].x;
            game.Y = game.level[0].y;
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = game.level[0].doors;
            game.gates = game.level[0].gates;
            game.name = game.level[0].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            minigames.Type2 = Math.floor(Math.random() * 2) + 1;
            break;
        case 2:
            game.X = game.level[1].x;
            game.Y = game.level[1].y;
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = game.level[1].doors;
            game.gates = game.level[1].gates;
            game.name = game.level[1].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            minigames.Type2 = Math.floor(Math.random() * 2) + 1;
            break;
        case 3:
            game.X = game.level[2].x;
            game.Y = game.level[2].y;
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = game.level[2].doors;
            game.gates = game.level[2].gates;
            game.name = game.level[2].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            minigames.Type2 = Math.floor(Math.random() * 2) + 1;
            break;
        case 4:
            game.X = game.level[3].x;
            game.Y = game.level[3].y;
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = game.level[3].doors;
            game.gates = game.level[3].gates;
            game.name = game.level[3].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            minigames.Type2 = Math.floor(Math.random() * 2) + 1;
            break;
        case 5:
            game.X = game.level[4].x;
            game.Y = game.level[4].y;
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = 1
            game.gates = game.level[4].gates;
            game.name = game.level[4].name;
            minigames.Type1 = Math.floor(Math.random() * 2) + 1;
            minigames.Type2 = Math.floor(Math.random() * 2) + 1;
            break;
        case 6:
            game.X = (data.rooms[7].x);
            game.Y = (data.rooms[7].y);
            game.XO = (width/2) - (game.X / 2);
            game.YO = (height * 0.75) - game.Y;
            game.XF = game.XO + game.X;
            game.YF = game.YO + game.Y;
            game.doors = 0;
            game.gates = 0;
            fade = 0;
            fadedark = 0;
            eyes.y1 = height/2;
            eyes.y2 = height/2;
            game.final = true;
            orb.spawn = false;
            player.gate1comp = false;
            break;
    }
}
//Random Map Generation - Sets each index in Game.Map to a random set of objects from the Maps.JSON file
function RandomGen() {
    for (let i = 0; i < 5; i++) {
        game.map[i] = Math.round(Math.random());
        let random = Math.floor(Math.random() * 4) + 1;
        maphud.mapblock[i] = true;
        if (game.map[i] === 0) {
            game.level[i] = data.rooms[random];
            game.level[i].which = 0;
        } else {
            game.level[i] = data.rooms[random];
            game.level[i].which = 1;
        }
    }
}

/*function pulseeffect(x, y, col) {
    push();
    noStroke();
    angle.one += 1;
    let val = cos(radians(angle.one)) * 42.0;
    for (let a = 0; a < 360; a += 45) {
        let xoff = cos(radians(a)) * val;
        let yoff = sin(radians(a)) * val;
        fill(col);
        ellipse(x + xoff, y + yoff, val, val);
    }
    pop();
}*/
//Map Drawing - Called in Draw() and will draw the map aswell as calling functions for drawing Gates, Orbs and Portals
function MapAndBorders(){
    fill(14, 99);
    imageMode(CORNER);
    image(backdrop, width * 0.013, height * 0.023);
    if (game.final) final();
    imageMode(CORNERS);
    if (game.name === "intro") image(floor.one, game.XO, game.YO, game.XF, game.YF);
    if (game.name === "pnheal") image(floor.two, game.XO, game.YO, game.XF, game.YF);
    if (game.name === "ptrap") image(floor.three, game.XO, game.YO, game.XF, game.YF);
    if (game.name === "full") image(floor.four, game.XO, game.YO, game.XF, game.YF);
    if (game.name === "trap") image(floor.five, game.XO, game.YO, game.XF, game.YF);
    noFill();
    stroke(90);
    strokeWeight(3);

    if (game.final === false) {
        fill(0)
        if (game.doors === 2) {
            //pulseeffect((game.XO + (game.X /5)), game.YO + 70, color(0));
            circle((game.XO + (game.X / 5)), game.YO + 70, 65);
            circle((game.XF - (game.X / 5)), game.YO + 70, 65);
            circle((game.XO + (game.X / 5)), game.YO + 70, 60);
            circle((game.XF - (game.X / 5)), game.YO + 70, 60);
            stroke(190, 80);
            circle((game.XO + (game.X / 5)), game.YO + 70, 50);
            circle((game.XF - (game.X / 5)), game.YO + 70, 50);
            fill(0, 100);
            circle((game.XO + (game.X / 5)), game.YO + 70, 55);
            circle((game.XF - (game.X / 5)), game.YO + 70, 55);
            noStroke();
            fill(135, 48, 246, 20);
            circle((game.XO + (game.X / 5)), game.YO + 70, 45);
            circle((game.XF - (game.X / 5)), game.YO + 70, 45);
            noFill();
            stroke(0, 170);
            circle((game.XO + (game.X / 5)), game.YO + 70, 70);
            circle((game.XF - (game.X / 5)), game.YO + 70, 70);
        }
        if (game.doors === 1) {
            circle((game.XO + (game.X / 2)), game.YO + 70, 65);
            circle((game.XO + (game.X / 2)), game.YO + 70, 60);
            stroke(190, 80);
            circle((game.XO + (game.X / 2)), game.YO + 70, 50);
            fill(0, 100);
            circle((game.XO + (game.X / 2)), game.YO + 70, 55);
            noStroke();
            fill(135, 48, 246, 20);
            circle((game.XO + (game.X / 2)), game.YO + 70, 45);
            noFill();
            stroke(0, 170);
            circle((game.XO + (game.X / 2)), game.YO + 70, 70);
        }
        imageMode(CENTER);
        if (game.YO + (game.Y / 3) <= height * 0.51 && game.gates === 2) GatesDraw22();
        if (orb.spawn === true) {
            if (game.YO + (game.Y / 2.25) <= height * 0.58 && orb.opened === false) image(game.orb, (game.XO + (game.X / 2)), (game.YO + (game.Y / 2.25)));
            if (game.YO + (game.Y / 2.25) <= height * 0.58 && orb.opened === true) image(game.orbdead, (game.XO + (game.X / 2)), (game.YO + (game.Y / 2.25)));
        }
        if (game.YO + (game.Y / 2) <= height * 0.51 && game.gates === 1) GatesDraw1();
        if (game.YO + (game.Y / 2) <= height * 0.51 && game.gates === 2) GatesDraw21();
    }
}
// Drawing the gates, this is called in MapAndBorders and Main Draw, it's a function because it is called in 2 different functions.
function GatesDraw22() {
    push();
    imageMode(CENTER);
    if (player.gate2comp === false) image(game.gateim, XYC.XO + 80, XYC.YO + (game.Y/3));
    else image(game.gateimo, XYC.XO + 80, XYC.YO + (game.Y/3));
    noFill();
    strokeWeight(8);
    stroke(0);
    rect(XYC.XF - 10, XYC.YO + (game.Y/3), XYC.XO + 150, (XYC.YO + (game.Y/3)) + 71);
    stroke(130);
    strokeWeight(6);
    strokeCap(SQUARE);
    line(XYC.XF - 14, (XYC.YO + (game.Y/3)) + 15, XYC.XO + 155, (XYC.YO + (game.Y/3)) + 15);
    line(XYC.XF - 14, (XYC.YO + (game.Y/3)) + 30, XYC.XO + 155, (XYC.YO + (game.Y/3)) + 30);
    line(XYC.XF - 14, (XYC.YO + (game.Y/3)) + 45, XYC.XO + 155, (XYC.YO + (game.Y/3)) + 45);
    line(XYC.XF - 14, (XYC.YO + (game.Y/3)) + 60, XYC.XO + 155, (XYC.YO + (game.Y/3)) + 60);
    stroke(0);
    line(XYC.XF - (game.X/2), (XYC.YO + (game.Y/3)) - 10, (XYC.XF - (game.X/2)), (XYC.YO + (game.Y/3)) + 70);
    line(XYC.XF - (game.X/4), (XYC.YO + (game.Y/3)) - 10, (XYC.XF - (game.X/4)), (XYC.YO + (game.Y/3)) + 70);
    line(XYC.XF - 9, (XYC.YO + (game.Y/3)) - 10, XYC.XF - 9, (XYC.YO + (game.Y/3)) + 70);
    pop();
}
function GatesDraw21() {
    push();
    imageMode(CENTER);
    if (player.gate1comp === false) image(game.gateim, XYC.XF - 80, XYC.YO + (game.Y/2));
    else image(game.gateimo, XYC.XF - 80, XYC.YO + (game.Y/2));
    noFill();
    strokeWeight(8);
    stroke(0);
    rect(XYC.XO + 10, XYC.YO + (game.Y/2), XYC.XF - 150, (XYC.YO + (game.Y/2)) + 71);
    stroke(130);
    strokeWeight(6);
    strokeCap(SQUARE);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 15, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 15);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 30, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 30);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 45, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 45);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 60, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 60);
    stroke(0);
    line(XYC.XO + (game.X/2), (XYC.YO + (game.Y/2)) - 10, (XYC.XO + (game.X/2)), (XYC.YO + (game.Y/2)) + 70);
    line(XYC.XO + (game.X/4), (XYC.YO + (game.Y/2)) - 10, (XYC.XO + (game.X/4)), (XYC.YO + (game.Y/2)) + 70);
    line(XYC.XO + 9, (XYC.YO + (game.Y/2)) - 10, XYC.XO + 9, (XYC.YO + (game.Y/2)) + 70);
    pop();
}
// Single level Gates
function GatesDraw1() {
    push();
    imageMode(CENTER);
    if (player.gate1comp === false) image(game.gateim, XYC.XF - 80, XYC.YO + (game.Y/2));
    else image(game.gateimo, XYC.XF - 80, XYC.YO + (game.Y/2));
    noFill();
    strokeWeight(8);
    stroke(0);
    rect(XYC.XO + 10, XYC.YO + (game.Y/2), XYC.XF - 150, (XYC.YO + (game.Y/2)) + 71);
    stroke(130);
    strokeWeight(6);
    strokeCap(SQUARE);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 15, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 15);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 30, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 30);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 45, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 45);
    line(XYC.XO + 14, (XYC.YO + (game.Y/2)) + 60, XYC.XF - 155, (XYC.YO + (game.Y/2)) + 60);
    stroke(0);
    line(XYC.XO + (game.X/2), (XYC.YO + (game.Y/2)) - 10, (XYC.XO + (game.X/2)), (XYC.YO + (game.Y/2)) + 70);
    line(XYC.XO + (game.X/4), (XYC.YO + (game.Y/2)) - 10, (XYC.XO + (game.X/4)), (XYC.YO + (game.Y/2)) + 70);
    line(XYC.XO + 9, (XYC.YO + (game.Y/2)) - 10, XYC.XO + 9, (XYC.YO + (game.Y/2)) + 70);
    pop();
}
// Final Level register - Called in MapAndBorders() and will register when the player enters the final victory animation
function final() {
    push();
    imageMode(CENTER);
    image(game.finalring, game.XO + (game.X/2), game.YO - 30);
    pop();
    if (game.YO + (game.Y / 2) > height * 0.5 ) {
        game.victory = true;
    }
}
//Different Window Sizes Functionality
function windowResized() {
    resizeCanvas(windowWidth/2, windowHeight/1.8);
    canv.position(windowWidth/4, windowHeight*0.3);
    button.position(width*0.9, height * 1.2);
    heart.cloned = heart.original.get();                        //set cloned image to original
    heart.cloned.resize(width * 0.07, height * 0.13);           //resizes cloned image relative to size of browser
    map.cloned = map.original.get();
    map.cloned.resize(width * 0.07, height * 0.13);
    torch.cloned = torch.original.get();
    torch.cloned.resize(width * 0.07, height * 0.13);
    eye.cloned = eye.original.get();
    eye.cloned.resize(width * 0.07, height * 0.13);
}
//Fade effects
function DarkFadeIn() {
    fill(0, fadedark);
    rectMode(CORNERS);
    rect(0, 0, width, height);
    if (fadedark < 255) fadedark++;
}
function WhiteFadeIn(){
    fill(255, 255, 255, fade);
    rectMode(CORNERS);
    rect(0, 0, width, height);
    if (fade<255) fade++;
}
function DarkFaintFade(){
    fill(0, 0, 0, fadepro);
    rectMode(CORNERS);
    rect(0, 0, width, height);
    if (fadepro<210) fadepro += 5;
}
function WhiteFadeOut(a, b, c, d){
    fill(255, 255, 255, fade);
    rectMode(CORNERS);
    rect(a, b, c, d);
    if (fade>0) fade--;
}
function Eyes2(){
    rectMode(CORNERS);
    fill(0);
    rect(0, 0, width, eyes.y1);
    rect(0, height, width, eyes.y2);
    if (eyes.y1 > 0) eyes.y1 -= 2;
    if (eyes.y2 < height) eyes.y2 += 2;
}
function Eyes(){
    fill(0);
    rectMode(CORNERS);
    rect(0, 0, width, height);
    fill(255);
    rect(0, eyes.y1, width, eyes.y2);
    if (eyes.y1 < height/2) eyes.y1 += 5;
    if (eyes.y2 > height/2) eyes.y2 -= 1;
}
//Intro Sequence Fall Function
function fall(){
    fill(255);
    rectMode(CORNERS);
    rect(0, 0, width/8, height);
    imageMode(CENTER);
    scale(1, -1);
    image(back, width/10, heightoffall);
    heightoffall -= height * 0.01;
}
//Renders the Map Hud images
function HudBoxes(index, a, b, c, d, a2, b2, c2, d2) {
    if (game.level[index].which === 0){
        image(maphud.safe, width * a , height * b, width * c, height * d);
        image(maphud.unsafe, width * a2 , height * b2, width * c2, height * d2);
    } else {
        image(maphud.unsafe, width * a , height * b, width * c, height * d);
        image(maphud.safe, width * a2 , height * b2, width * c2, height * d2);
    }
    if (maphud.mapblock[index] === true) {
        image(maphud.unknown, width * a , height * b, width * c, height * d);
        image(maphud.unknown, width * a2 , height * b2, width * c2, height * d2);
    }
}
//Player on the hud is placed here
function CurrentLMap(index, a, b, a2, b2){
    if (game.level[index].which === 0) image(player.right, width * a, height * b);
    else image(player.right, width * a2, height * b2);
}
//Main Draw function - Everything is linked to this function
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
                orb.spawn = true;
                orb.opened = false;
                game.current = 0;
                game.currentc = 0;
                MapGen();
                intro[5] = false;
                clear();
                start = true;
            }
        }
    }
    //Main Game Sequence
    if (start) {
        XYFix();
        //Draw Layout
        rectMode(CORNERS);
        //Render Map and the white border
        MapAndBorders();
        MapSize();
        imageMode(CENTER);
        // Renders the player sprite
        PlayerMoving();
        // Renders the gates, at a depth infront of the player, if they have completed the gate AND they are infront of it (It basically makes the player look as if they are behind the gates, giving an illusion of depth)
        if (game.YO + (game.Y/3) >= height * 0.5 && player.gate2comp === true && game.gates === 2) GatesDraw22();
        if (orb.spawn === true){
            if (game.YO + (game.Y/2.25) >= height * 0.575 && orb.opened === false) image(game.orb, (XYC.XO + (game.X/2)), (XYC.YO + (game.Y / 2.25)));
            if (game.YO + (game.Y/2.25) >= height * 0.575 && orb.opened === true) image(game.orbdead, (XYC.XO + (game.X/2)), (XYC.YO + (game.Y / 2.25)));
        }
        if (game.YO + (game.Y/2) >= height * 0.5 && player.gate1comp === true && game.gates === 1) GatesDraw1();
        if (game.YO + (game.Y/2) >= height * 0.5 && player.gate1comp === true && game.gates === 2) GatesDraw21();
        imageMode(CENTER);
        stroke(110);
        strokeCap(SQUARE);
        strokeWeight(19);
        line(0, 0, 0, height);
        line(0, 0, width, 0);
        line(width, height, 0, height);
        line(width, height, width, 0);
        stroke(0);
        strokeWeight(3);
        line(width * 0.01, height * 0.02, width * 0.99, height * 0.02);
        line(width * 0.01, height * 0.02, width * 0.01, height * 0.98);
        line(width * 0.99, height * 0.98, width * 0.01, height * 0.98);
        line(width * 0.99, height * 0.98, width * 0.99, height * 0.02);
        strokeWeight(0);
        strokeCap(ROUND);
        noStroke();
        // Hud Outlines
        fill(0);
        rect(width * 0.03, height * 0.8, width * 0.97, height * 0.95);
        fill(110);
        rect(width * 0.032, height * 0.804, width * 0.967, height * 0.946);
        fill(0);
        rect(width * 0.037, height * 0.81, width * 0.963, height * 0.94);
        fill(255);
        rect(width * 0.04, height * 0.814, width * 0.96, height * 0.934);
        image(heart.cloned, width * 0.08, height * 0.87);
        //heart bar
        fill(0)
        rect(width * 0.12, height * 0.925, width * 0.3, height * 0.825);
        fill(110);
        rect(width * 0.125, height * 0.9, width * 0.295, height * 0.85);
        fill(255);
        // HP lost
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
            if (frameCount % 60 > 30) {                                              // Every 30 frames, triggers between off and on
                fill(0, 0);
                rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
            }
            else rect(width * 0.132, height * 0.91, (width * 0.175), height * 0.84);
        }
        // Map Bar + Map Counter
        fill(255,80);
        rect(width * 0.03, height * 0.69, width * 0.15, height * 0.78);
        rect(width * 0.035, height * 0.7, width * 0.145, height * 0.77);
        textSize(10 * (width * 0.0025));
        textFont('Courier New');
        fill(255)
        text("Tab", width * 0.11, height * 0.75);
        push();
        scale(0.6)
        image(map.cloned, width * 0.1, height * 1.22);
        pop();
        image(map.cloned, width * 0.34, height * 0.87);
        fill(0)
        textSize(25 * (width * 0.0025));
        textFont('Arial Black');
        text(str(hud.map), width * 0.39, height * 0.915);
        // Torch + Torch Counter
        image(torch.cloned, width * 0.43, height * 0.87);
        text(str(hud.torches), width * 0.47, height * 0.915);
        // Blackout Timer
        image(eye.cloned, width * 0.52, height * 0.88)
        rect(width * 0.57, height * 0.925, width * 0.95, height * 0.825);
        fill(255);
        rect(width * 0.575, height * 0.915, width * 0.945, height * 0.835);
        fill(0);
        rect(width * 0.58, height * 0.905, ((width * 0.94) - (hud.blackout * 11.52)), height * 0.845);
        Doors();
        GateInfo();
        OrbInfo();
        if (minigames.Ingame1 === true) {
            switch (minigames.Type1){
                case 1: 
                    StopGhost();
                    break;
                case 2: 
                    TheLight();
                    break;
            }
        }
        if (minigames.Ingame2 === true) {
            switch (minigames.Type2){
                case 1:
                    StopGhost();
                    break;
                case 2:
                    TheLight();
                    break;
            }
        }
        imageMode(CORNERS);
        //Open an Orb animation
        if (orb.open === true) {
            pressl = false;
            pressr = false;
            pressf = false;
            pressb = false;
            player.space = false;
            DarkFaintFade();
            if (fadepro >= 210) {
                image(game.orbback, width * 0.1, height * 0.1, width * 0.9, height * 0.9);
                push();
                noFill()
                stroke(0)
                strokeWeight(5)
                rect(width * 0.1, height * 0.1, width * 0.9, height * 0.9);
                pop();
                OrbHover((width * 0.3), (height * 0.5), width* 0.08, 1, map.cloned);
                OrbHover((width * 0.5), (height * 0.5), width* 0.08, 2, torch.cloned);
                OrbHover((width * 0.7), (height * 0.5), width* 0.08, 3, heart.cloned);
            }
        }
        //Open the Hud animation
        if (maphud.display === true) {
            pressl = false;
            pressr = false;
            pressf = false;
            pressb = false;
            player.space = false;
            DarkFaintFade();
            if (fadepro >= 210) {
                image(maphud.image, width * 0.1, height * 0.1, width * 0.9, height * 0.9);
                push();
                noFill()
                stroke(255)
                strokeWeight(1)
                rect(width * 0.1, height * 0.1, width * 0.9, height * 0.9);
                pop();
                HudBoxes(0, 0.32, 0.34, 0.40, 0.48, 0.32, 0.52, 0.40, 0.66);
                HudBoxes(1, 0.41, 0.34, 0.49, 0.48, 0.41, 0.52, 0.49, 0.66);
                HudBoxes(2, 0.50, 0.34, 0.58, 0.48, 0.50, 0.52, 0.58, 0.66);
                HudBoxes(3, 0.59, 0.34, 0.67, 0.48, 0.59, 0.52, 0.67, 0.66);
                HudBoxes(4, 0.68, 0.34, 0.76, 0.48, 0.68, 0.52, 0.76, 0.66);
                push();
                imageMode(CENTER);
                switch (game.current){
                    case 0:
                        image(player.right, width * 0.23, height * 0.5);
                        break;
                    case 1:
                        CurrentLMap(0, 0.36, 0.41, 0.36, 0.59)
                        break;
                    case 2:
                        CurrentLMap(1, 0.45, 0.41, 0.45, 0.59)
                        break;
                    case 3:
                        CurrentLMap(2, 0.54, 0.41, 0.54, 0.59)
                        break;
                    case 4:
                        CurrentLMap(3, 0.63, 0.41, 0.63, 0.59)
                        break;
                    case 5:
                        CurrentLMap(4, 0.72, 0.41, 0.72, 0.59)
                        break;
                }
                pop();
            }
        }
        //Makes the current level viewable on the map, if the player does not have it currently shown
        if (hud.map !== item.mapcountc && game.current < 5) {
            maphud.mapblock[game.current] = false;
            item.mapcountc = hud.map;
        }
        //Runs MapGen when a level change is detected
        if (game.current !== game.currentc) {
            MapGen();
            orb.opened = false;
            maphud.mapblock[game.current - 1] = false;
            player.gate1comp = false;
            player.gate2comp = false;
            game.currentc = game.current;
        }
    }
    //Defeat
    if (lost === true){
        if (fade < 255) {
            WhiteFadeIn();
        }
        else {
            if (eyes.y1 < height/2) Eyes();
            else {
                fill(255);
                textSize(15 * (width * 0.0025));
                textFont('Courier New');
                text("You fall into a deep sleep", width * 0.5, height * 0.4);
                fill(0);
                text("Fading into the afterlife", width * 0.5, height * 0.6);
                if (restart.createb === false) {
                    if (restart.button === undefined) {
                        restart.button = createButton('Restart?');
                        restart.button.position(width * 0.9, height * 1.2);
                        restart.button.size(200, 50);
                        restart.button.style("font-size", "30px");
                        restart.button.style("text-align", "left");
                        restart.button.style("font-family", "Courier New")
                        restart.button.mousePressed(restartmatch);
                    }
                    else {
                        restart.button.show();
                    }
                    restart.createb = true;
                }
            }
        }
    }
    //Victory
    if (game.victory === true){
        if (fade < 255) WhiteFadeIn();
        else {
            if (game.final) {
                game.final = false;
                start = undefined;
                counter = 0;
                finalfade.one = 0;
                finalfade.two = 0;
                restart.createb = false;
            }
            push();
            fill(255);
            rect(0, 0, width, height);
            pop();
            if (fadedark < 255) DarkFadeIn();
            else {
                push();
                imageMode(CORNERS);
                image(game.finalsky,  0, 0 , width, height);
                fill(0);
                textSize(15 * (width * 0.0025));
                textFont('Courier New');
                text("You wake up to the blue sky\nWith not a single memory.", width * 0.5, height * 0.4);
                pop();
                if (eyes.y1 > 0) Eyes2();
                else {
                    if (counter < 300) counter++
                    else {
                        if (finalfade.one < 255) {
                            finalfade.one++
                            push();
                            tint(255, finalfade.one);
                            image(game.finallook, 0, 0, width, height);
                            pop();
                        }
                        else {
                            push();
                            imageMode(CORNERS);
                            image(game.finallook, 0, 0, width, height);
                            pop();
                            if (finalfade.two < 150) {
                                finalfade.two++
                                push();
                                fill(255, finalfade.two);
                                rect(width * 0.2, height * 0.2, width * 0.8, height * 0.36);
                                fill(255, finalfade.two);
                                rect(width * 0.21, height * 0.23, width * 0.79, height * 0.33);
                                fill(0, finalfade.two * 2);
                                textSize(15 * (width * 0.0025));
                                textFont('Courier New');
                                text("You Survived the blackout", width * 0.5, height * 0.3);
                                pop();
                            }
                            else {
                                push();
                                fill(255, 150);
                                rect(width * 0.2, height * 0.2, width * 0.8, height * 0.36);
                                fill(255, 150);
                                rect(width * 0.21, height * 0.23, width * 0.79, height * 0.33);
                                fill(0);
                                textSize(15 * (width * 0.0025));
                                textFont('Courier New');
                                text("You Survived the blackout", width * 0.5, height * 0.3);
                                pop();
                                if (restart.createb === false) {
                                    if (restart.button === undefined) {
                                        restart.button = createButton('Restart?');
                                        restart.button.position(width * 0.9, height * 1.2);
                                        restart.button.size(200, 50);
                                        restart.button.style("font-size", "30px");
                                        restart.button.style("text-align", "left");
                                        restart.button.style("font-family", "Courier New")
                                        restart.button.mousePressed(restartmatch);
                                    }
                                    else {
                                        restart.button.show();
                                    }
                                    restart.createb = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
// Fix for an issue causing some objects to move incorrectly, when a player moves
function XYFix(){
    XYC.XO = game.XO;
    XYC.XF = game.XF;
    XYC.YO = game.YO;
    XYC.YF = game.YF;
}
// INTERACTION FUNCTIONS

// INPUTS

// Player presses key
function keyPressed() {
    if (orb.open !== true) {
        switch (keyCode) {
            case LEFT_ARROW:
                if (maphud.display !== true && minigames.Ingame1 !== true && minigames.Ingame2 !== true) {
                    pressl = true;
                    player.dx = 2;
                }
                break;
            case RIGHT_ARROW:
                if (maphud.display !== true && minigames.Ingame1 !== true && minigames.Ingame2 !== true) {
                    pressr = true;
                    player.dx = -2;
                }
                break;
            case DOWN_ARROW:
                if (maphud.display !== true && minigames.Ingame1 !== true && minigames.Ingame2 !== true) {
                    pressb = true;
                    player.dy = -2;
                }
                break;
            case UP_ARROW:
                if (maphud.display !== true && minigames.Ingame1 !== true && minigames.Ingame2 !== true) {
                    pressf = true;
                    player.dy = 2;
                }
                break;
            case 32:
                if (maphud.display !== true) {
                    player.space = true;
                    NextLevel();
                }
                break;
            case TAB:
                if (minigames.Ingame1 !== true && minigames.Ingame2 !== true) {
                    fadepro = 0;
                    maphud.display = maphud.display === true ? false : true;
                }
                break;
        }
    }
    return false;
}
// Player releases key
function keyReleased() {
    switch (keyCode) {
        case LEFT_ARROW:
            pressl = false;
            break;
        case RIGHT_ARROW:
            pressr = false;
            break;
        case DOWN_ARROW:
            pressb = false;
            break;
        case UP_ARROW:
            pressf = false;
            break;
        case 32:
            player.space = false;
            break;
    }
}
// Player presses mouse
function mousePressed(){
    if (orb.b1) {
        orb.open = false;
        hud.map += 1;
        orb.b1 = false;
    }
    if (orb.b2) {
        orb.open = false;
        hud.torches += 1;
        orb.b2 = false;
    }
    if (orb.b3) {
        orb.open = false;
        if (hud.health < 3) hud.health += 1;
        orb.b3 = false;
    }
    if (minigames.FindTrue === false && dist(minigames.FindPos.x, minigames.FindPos.y, mouseX, mouseY) < 30){
        minigames.FindTrue = true;
    }
}
// Mouse Hover On Orb
function OrbHover(PositionX, PositionY, SizeBox, which, imager){
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    fill(255, 100)
    strokeWeight(3)
    if (mouseX > PositionX - SizeBox && mouseX < PositionX + SizeBox && mouseY > PositionY - SizeBox && mouseY < PositionY + SizeBox){
        push();
        stroke(255);
        rect(PositionX, PositionY, SizeBox * 2);
        image(imager, PositionX, PositionY);
        pop();
        switch (which) {
            case 1:
                orb.b1 = true;
                break;
            case 2:
                orb.b2 = true;
                break;
            case 3:
                orb.b3 = true;
                break;
        }
    } else {
        push();
        stroke(0);
        rect(PositionX, PositionY, SizeBox * 2);
        image(imager, PositionX, PositionY);
        pop();
        switch (which) {
            case 1:
                orb.b1 = false;
                break;
            case 2:
                orb.b2 = false;
                break;
            case 3:
                orb.b3 = false;
                break;
        }
    }
    pop();
}
// Moving Player
function PlayerMoving() {
    if (start === true) {
        if (player.dx === 0 && player.dy === 0) {
            image(player.for, width * 0.5, height * 0.6);
        }
        if (player.dx === 2) {
            game.XO += 3;
            game.XF += 3;
            if (player.dy === 0) {
                image(player.left, width * 0.5, height * 0.6);
            }
            if (pressl === false) {
                player.dx = 0;
            }
        }
        if (player.dx === -2) {
            game.XO -= 3;
            game.XF -= 3;
            if (player.dy === 0) {
                image(player.right, width * 0.5, height * 0.6);
            }
            if (pressr === false) {
                player.dx = 0;
            }
        }
        if (player.dy === 2) {
            game.YO += 3;
            game.YF += 3;
            if (player.dx === 2) {
                image(player.forl, width * 0.5, height * 0.6);
            } else if (player.dx === -2) {
                image(player.forr, width * 0.5, height * 0.6)
            } else {
                image(player.for, width * 0.5, height * 0.6);
            }
            if (pressf === false) {
                player.dy = 0;
            }
        }
        if (player.dy === -2) {
            game.YO -= 3;
            game.YF -= 3;
            if (player.dx === 2) {
                image(player.backl, width * 0.5, height * 0.6);
            } else if (player.dx === -2) {
                image(player.backr, width * 0.5, height * 0.6)
            } else {
                image(player.back, width * 0.5, height * 0.6);
            }
            if (pressb === false) {
                player.dy = 0;
            }
        }
    }
}
//Map Borders to limit players
function MapSize() {
    if (game.XO > width * 0.5) {
        game.XO = width * 0.5;
        game.XF = game.XO + game.X;
    }
    if (game.XF < width * 0.5) {
        game.XF = width * 0.5;
        game.XO = game.XF - game.X;
    }
    if (game.YO > height * 0.6) {
        game.YO = height * 0.6;
        game.YF = game.YO + game.Y;
    }
    if (game.YF < height * 0.64) {
        game.YF = height * 0.64;
        game.YO = game.YF - game.Y;
    }
    switch (game.gates){
        case 1: 
            if (player.gate1comp === false){
                if(game.YO + (game.Y/2) > height * 0.5){
                    game.YO = (height * 0.5) - (game.Y/2);
                    game.YF = game.YO + game.Y;
                }
            }
            if (player.gate1comp === true) {
                if (game.YO + (game.Y / 1.97) > height * 0.5 && game.YO + (game.Y / 2.03) < height * 0.5 && game.XO + (game.X - 150) > width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 1.97);
                    game.YF = game.YO + game.Y;
                }
                if (game.YO + (game.Y / 2.03) > height * 0.5 && game.YO + (game.Y / 2.08) < height * 0.5 && game.XO + (game.X - 150) > width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 2.08);
                    game.YF = game.YO + game.Y; 
                }
            }
            break;
        case 2:
            if (player.gate1comp === false){
                if(game.YO + (game.Y/2) > height * 0.5){
                    game.YO = (height * 0.5) - (game.Y/2);
                    game.YF = game.YO + game.Y;
                }
            }
            if (player.gate1comp === true) {
                if (game.YO + (game.Y / 1.97) > height * 0.5 && game.YO + (game.Y / 2.03) < height * 0.5 && game.XO + (game.X - 150) > width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 1.97);
                    game.YF = game.YO + game.Y;
                }
                if (game.YO + (game.Y / 2.03) > height * 0.5 && game.YO + (game.Y / 2.08) < height * 0.5 && game.XO + (game.X - 150) > width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 2.08);
                    game.YF = game.YO + game.Y;
                }
            }
            if (player.gate2comp === false){
                if(game.YO + (game.Y/3) > height * 0.5){
                    game.YO = (height * 0.5) - (game.Y/3);
                    game.YF = game.YO + game.Y;
                }
            }
            if (player.gate2comp === true) {
                if (game.YO + (game.Y / 2.97) > height * 0.5 && game.YO + (game.Y / 3.03) < height * 0.5 && game.XF - (game.X - 150) < width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 2.97);
                    game.YF = game.YO + game.Y;
                }
                if (game.YO + (game.Y / 3.03) > height * 0.5 && game.YO + (game.Y / 3.20) < height * 0.5 && game.XF - (game.X - 150) < width * 0.5) {
                    game.YO = (height * 0.5) - (game.Y / 3.20);
                    game.YF = game.YO + game.Y;
                }
            }
    }
}
//Generic function to handle all elements that show text such as "Press space to x"
function GenericInteraction(input){
    fill(255);
    textSize(20 * (width * 0.0025));
    textFont('Courier New');
    text(input, width * 0.5, height * 0.2);
    fill(255, 100);
    rect(width * 0.4, height * 0.70, width * 0.6, height * 0.77);
    fill(0);
    textSize(12 * (width * 0.0025));
    text("Press Space", width * 0.5, height * 0.75);
}
//Calls GenericInteraction() when near an unopened orb
function OrbInfo(){
    if (orb.spawn === true && orb.opened === false){
        if ((dist(game.XO + (game.X / 2), (game.YO + (game.Y/2.25)), width * 0.5, height * 0.65)) < 90) {
            GenericInteraction("Open Orb?");
            game.o1 = true;
        } else game.o1 = false;
    }
}
//Calls GenericInteraction() when near an unopened gate
function GateInfo(){
    if (game.gates === 1 && player.gate1comp === false && minigames.Ingame1 !== true){
        if ((dist(game.XF - 80, (game.YO + (game.Y/2)) + 70, width * 0.5, height * 0.65)) < 90) {
            GenericInteraction("Open Gate?");
            game.d1 = true;
        } else game.d1 = false;
    }
    if (game.gates === 2 && player.gate1comp === false && minigames.Ingame1 !== true){
        if ((dist(game.XF - 80, (game.YO + (game.Y/2)) + 70, width * 0.5, height * 0.65)) < 90) {
            GenericInteraction("Open Gate?");
            game.d1 = true;
        } else game.d1 = false;
    }
    if (game.gates === 2 && player.gate2comp === false && minigames.Ingame2 !== true){
        if ((dist(game.XO + 80, (game.YO + (game.Y/3)) + 70, width * 0.5, height * 0.65)) < 90) {
            GenericInteraction("Open Gate?");
            game.d2 = true;
        } else game.d2 = false;
    }
}
//Calls GenericInteraction() when near a portal
function Doors(){
    if (game.doors === 2) {
        if ((dist(game.XO + (game.X /5), game.YO + 70, width * 0.5, height * 0.65)) < 60) {
            GenericInteraction("Path 1?");
            game.ex1 = true;
        } else game.ex1 = false;
        if ((dist(game.XF - (game.X /5), game.YO + 70, width * 0.5, height * 0.65)) < 60) {
            GenericInteraction("Path 2?");
            game.ex2 = true;
        } else game.ex2 = false;
    }
    if (game.doors === 1) {
        if ((dist(game.XO + (game.X / 2), game.YO + 70, width * 0.5, height * 0.65)) < 60) {
            GenericInteraction("Continue?");
            game.exonly = true;
        } else game.exonly = false;
    }
}
//Handles all interaction with all GenericInteraction() elements
function NextLevel() {
    if (game.ex1 === true && player.space === true) {
        game.ex1 = false;
        player.space = false;
        if (game.current < 5) {
            if (game.level[game.current].which === 0) {
                game.current += 1;
            }
            else {
                restart.createb = false;
                lost = true;
                start = null;
                eyes.y1 = 0;
                eyes.y2 = height;
                fade = 0;
            }
        }
    }
    if (game.ex2 === true && player.space === true) {
        game.ex2 = false;
        player.space = false;
        if (game.current < 5) {
            if (game.level[game.current].which === 1) {
                game.current += 1;
            }
            else {
                restart.createb = false;
                lost = true;
                start = null;
                eyes.y1 = 0;
                eyes.y2 = height;
                fade = 0;
            }
        }
    }
    if (game.exonly === true && player.space === true) {
        game.exonly = false;
        player.space = false;
        if (game.current < 7) {
            game.current += 1;
        }
    }
    if (game.d1 === true && player.space === true) {
        fadepro = 0;
        game.d1 = false;
        minigames.Ingame1 = true;
        pressl = false;
        pressr = false;
        pressf = false;
        pressb = false;
        minigames.Spamspace = 0;
        minigames.Count = 0;
    }
    if (game.d2 === true && player.space === true) {
        fadepro = 0;
        game.d2 = false;
        minigames.Ingame2 = true;
        pressl = false;
        pressr = false;
        pressf = false;
        pressb = false;
        minigames.Spamspace = 0;
        minigames.Count = 0;
    }
    if (game.o1 === true && player.space === true) {
        game.o1 = false;
        orb.opened = true;
        orb.open = true;
        fadepro = 0;
    }
}

// MINIGAMES

//Stop the ghost:
function StopGhost() {
    DarkFaintFade();
    if (fadepro >= 210) {
        push();
        imageMode(CORNERS);
        image(minigames.StopGImBack, width * 0.1, height * 0.1, width * 0.9, height * 0.9);
        noFill()
        stroke(0)
        strokeWeight(5)
        rect(width * 0.1, height * 0.1, width * 0.9, height * 0.9);
        imageMode(CENTER);
        tint(255, minigames.StopGSize * 30)
        image(minigames.StopGIm, width * 0.5, height * 0.5, minigames.StopGIm.width * minigames.StopGSize, minigames.StopGIm.height * minigames.StopGSize)
        pop();
        push();
        fill(255);
        textSize(20 * (width * 0.0025));
        textFont('Courier New');
        fill(255, 100);
        rect(width * 0.4, height * 0.80, width * 0.6, height * 0.87);
        fill(0);
        textSize(12 * (width * 0.0025));
        text("Spam Space", width * 0.5, height * 0.85);
        text("Stop The Demon", width * 0.5, height * 0.18);
        pop();
        minigames.StopGSize += 0.001
        if (player.space === true){
            minigames.Spamspace += 1;
            minigames.StopGSize -= 0.02;
            player.space = false;
        }
        if (minigames.StopGSize < 0.2){
            if (minigames.Ingame1) {
                player.gate1comp = true;
                minigames.Ingame1 = false;
                game.d1 = false;
            }
            if (minigames.Ingame2) {
                player.gate2comp = true;
                minigames.Ingame2 = false;
                game.d2 = false;
            }
            minigames.StopGSize = 0.5;
        }
        if (minigames.StopGSize > 0.7) {
            if (minigames.Ingame1) {
                minigames.Ingame1 = false;
                game.d1 = false;
            }
            if (minigames.Ingame2) {
                minigames.Ingame2 = false;
                game.d2 = false;
            }
            hud.health -= 1;
            minigames.StopGSize = 0.5;
        }
    }
}
function TheLight() {
    DarkFaintFade();
    if (fadepro >= 210) {
        if (minigames.FindPos === undefined){
            minigames.FindPos = createVector(Math.floor(Math.random() * width), Math.floor(Math.random() * (height * 0.5) + (height * 0.25)));
            minigames.FindTrue = false;
        }
        push();
        rectMode(CORNERS);
        fill(0);
        stroke(0)
        strokeWeight(5)
        rect(0, 0, width, height);
        pop();
        push();
        fill(255, 50);
        ellipse(mouseX, mouseY, 140, 140);
        fill(255, 100);
        ellipse(mouseX, mouseY, 135, 135);
        fill(255, 150);
        ellipse(mouseX, mouseY, 130, 130);
        fill(255, 180);
        ellipse(mouseX, mouseY, 120, 120);
        fill(255, 200);
        ellipse(mouseX, mouseY, 100, 100);
        fill(255);
        ellipse(mouseX, mouseY, 80, 80);
        pop();
        push();
        textSize(20 * (width * 0.0025));
        textFont('Courier New');
        fill(0);
        textSize(12 * (width * 0.0025));
        text("Press Me", width * 0.5, height * 0.85);
        text("Find Me", width * 0.5, height * 0.18);
        imageMode(CENTER);
        image(player.leftdark, minigames.FindPos.x, minigames.FindPos.y);
        pop();
        if (minigames.FindTrue){
            if (minigames.Ingame1) {
                player.gate1comp = true;
                minigames.Ingame1 = false;
                game.d1 = false;
            }
            if (minigames.Ingame2) {
                player.gate2comp = true;
                minigames.Ingame2 = false;
                game.d2 = false;
            }
            minigames.FindTrue = undefined;
            minigames.FindPos = undefined;
        }
    }
}