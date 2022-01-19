//Aurora borealis like sketch using 3D noise and flow fields

//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY


const NUM_PARTICLES = 300;
const MAG = .05;
const LENGTH = 30;

let inc = 0.1;
let scl = 10;
let zOff = 0;
let zInc = 0.01;

let cols, rows;
let fr;

var particles = [];

var flowField = [];


function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  // frameRate(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i] = new Particle();
    particles[i].rollColor();
  }
  
}

function draw() {
  background(0);
  let yOff = 0.0;
  

  for(let y = 0; y < rows; y ++){
    let xOff = 0;
    for(let x = 0; x < cols; x ++){
      let index = (x + y * cols);
      let angle = noise(xOff, yOff, zOff)* TAU;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(MAG);
      flowField[index] = v;
      xOff += inc;
      stroke(150, 100);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1);
      if ((keyIsPressed == true) && (key == 'a')){
      line(0, 0, scl, 0);
      }
      pop();
    }
    yOff+= inc;

  }

  let mouseVector = createVector(mouseX, mouseY);
  mouseVector.setMag = 1;
  
  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i].show();
    particles[i].update();
    particles[i].edges();
    particles[i].follow(flowField);
    //IF MOUSE PRESSED
    if(mouseIsPressed){
      //IF SPACEBAR PRESSED
      if ((keyIsPressed == true) && (key == ' ')){
        particles[i].followMouse(true);
      }
      else{
        particles[i].followMouse(false);
      }
    }
  }
  spacePressed = false;

  fr.html(floor(frameRate()));
  zOff += zInc;
}

