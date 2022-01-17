//Aurora borealis like sketch using 3D noise and flow fields


//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY

const NUM_PARTICLES = 50;

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

  // particles = new Array(NUM_PARTICLES);
  flowField = new Array(cols * rows);

  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    // particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  let yOff = 0.0;
  
  for(let y = 0; y < rows; y ++){
    let xOff = 0;
    for(let x = 0; x < cols; x ++){
      let index = (x + y * width) * 4;
      let magnitude = noise(xOff, yOff, zOff) - 0.5;
      let v = p5.Vector.fromAngle(-PI/2);
      v.setMag(magnitude);
      
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());

      stroke(0);
      strokeWeight(2);
      len = map(magnitude, -0.5, 0.5, -scl, scl);
      line(0, 0, len, 0);
      strokeWeight(5);
      point(0, 0);
      pop();

      xOff += inc;
    }
    yOff+= inc;
  }
  // zOff += zInc;
  noLoop();
  fr.html(floor(frameRate()));
}
