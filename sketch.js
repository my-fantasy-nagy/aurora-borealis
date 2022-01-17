//Aurora borealis like sketch using 3D noise and flow fields


//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY

const NUM_PARTICLES = 1;
const MAG_SCALAR = 10;
const HORIZONTAL_RATE = 2;
let inc = 0.1;
let scl = 30;
let zOff = 0;
let zInc = 0.01;

let cols, rows;
let fr;
let flowField = [];
var particles = [];

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  randomSeed(99);
  
  // particles = new Array(NUM_PARTICLES);
  flowField = new Array(cols * rows);

  for(var i = 0; i < NUM_PARTICLES; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  let yOff = 0.0;
  
  for(let y = 0; y < rows; y ++){
    let xOff = 0;
    for(let x = 0; x < cols; x ++){
      
      //get index
      let index = (y*rows+x);
      //determine magnitude and set magnitude of flowField at index
      let magnitude = noise(xOff, yOff, zOff) - 0.5;
      let v = p5.Vector.fromAngle(PI/2);
      v.setMag(magnitude* MAG_SCALAR);
      flowField[index] = v;
      
      
      push();
      
      //move to particular point on the grid
      translate(x * scl, y * scl);
      rotate(PI/2);
      
      //draw a line mapped to the magnitude of line;
      stroke(0);
      strokeWeight(2);
      len = map(magnitude, -0.5, 0.5, -scl, scl);
      // len = magnitude * scl*2;
      line(0, 0, len, 0);
      
      //draw a point
      strokeWeight(5);
      point(0, 0);
          
      pop();

      //update the X axis of the noise
      xOff += inc;
    }
    //update the Y axis of the noise
    yOff+= inc;
  }
  // Update the "time" axis of the noise
  // zOff += zInc;

  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    
    particles[i].update();
    particles[i].show();
    // particles[i].edges();
    particles[i].follow(flowField);
    particles[i].edgesTopBot();
    
    let v = p5.Vector.fromAngle(0);
    v.setMag(HORIZONTAL_RATE);
    particles[i].applyForce(v);

    if(particles[i].finishedDraw() == true){
      particles[i].edges();
    }
  }
  // for(var i = 0; i < flowField.length; i ++){
  //   print("i" + i + " flowField: " + flowField[i]);
  // }

  // noLoop();
  //Print frame Rate at bottom of sketch
  fr.html(floor(frameRate()));
}
