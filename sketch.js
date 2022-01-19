//Aurora borealis like sketch using 3D noise and flow fields

//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY


const NUM_PARTICLES = 300;
const MAG = .05;
const LENGTH = 30;
const NOISE_RATE = 0.1;
const Z_RATE = 0.01;
let scl = 10;
let zOffset = 0;
let cols, rows;
let fr;

var particles = [];

var flowField = [];


function setup() {
  
  createCanvas(400, 400);
  pixelDensity(1);
  
  //FLOW FIELD VECTOR ROWS/COLS
  cols = floor(width / scl);
  rows = floor(height / scl);

  //FOR DISPLAYING FRAME RATE
  fr = createP('');

  // ARRAY FOR HOLDING FLOW FIELD VECTORS
  flowField = new Array(cols * rows);

  // INITIALIZE PARTICLES AND ADD TO ARRAY
  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i] = new Particle();
    particles[i].rollColor();
  }
}

function draw() {
  background(0);

  // Y OFFSET RESET
  let yOff = 0.0;

  //LOOP OVER ROWS/COLS
  for(let y = 0; y < rows; y ++){

    let xOff = 0;

    for(let x = 0; x < cols; x ++){

      // SET INDEX
      let index = (x + y * cols);

      // ANGLE BASED ON X,Y & Z NOISE VALUES MAPPED TO UNIT CIRCLE
      let angle = noise(xOff, yOff, zOffset)* TAU;

      // CREATE VECTOR FROM ANGLE AND ADD TO FLOW FIELD
      let v = p5.Vector.fromAngle(angle);
      v.setMag(MAG);
      flowField[index] = v;

      //INCREMENT X OFFSET
      xOff += NOISE_RATE;
      
      //DISPLAY FLOW FIELD IF 'a' IS PRESSED
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

    // INCREMENT Y OFFSET
    yOff+= NOISE_RATE;

  }

  // CREATE MOUSE VECTOR
  let mouseVector = createVector(mouseX, mouseY);
  mouseVector.setMag = 1;
  
  // UPDATED PARTICLES
  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i].show();
    particles[i].update();
    particles[i].edges();
    particles[i].follow(flowField);

    //IF MOUSE PRESSED
    if(mouseIsPressed){
      //IF SPACEBAR PRESSED PUSH AWAY PARTICLES
      if ((keyIsPressed == true) && (key == ' ')){
        particles[i].followMouse(true);
      }
      else{
        // IF SPACEBAR NOT PRESSED PULL IN PARTICLES
        particles[i].followMouse(false);
      }
    }
  }

  //DISPLAY FRAMERATE
  fr.html(floor(frameRate()));

  // INCREMENT Z AXIS
  zOffset += Z_RATE;
}

