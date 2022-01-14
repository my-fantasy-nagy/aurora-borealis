//Aurora borealis like sketch using 3D noise and flow fields


//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY


const NUM_PARTICLES = 5000;
const MAG = .05;

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
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
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
      stroke(0, 100);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1);
      line(0, 0, scl, 0);

      pop();
    }
    yOff+= inc;
    
  }
  for (var i = 0; i < NUM_PARTICLES; i ++){ 
    particles[i].update();
    particles[i].show();
    particles[i].edges();
    particles[i].follow(flowField);

  }
  
  fr.html(floor(frameRate()));
  zOff += zInc;
}
