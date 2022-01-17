//Aurora borealis like sketch using 3D noise and flow fields


//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY


let inc = 0.1;
let scl = 30;
let zOff = 0;
let zInc = 0.01;

let cols, rows;

let fr;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
}

function draw() {
  background(255);
  let yOff = 0.0;
  
  let count = 0;
  for(let y = 0; y < rows; y ++){
    let xOff = 0;
    for(let x = 0; x < cols; x ++){
      let index = (x + y * width) * 4;
      let magnitude = noise(xOff, yOff, zOff) - 0.5;
      
      let v = p5.Vector.fromAngle(-PI/2);
      xOff += inc;
      stroke(0);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, 5, 0);

      pop();
      count ++;
    }
    yOff+= inc;
  }
  print(count);
  noLoop();
  fr.html(floor(frameRate()));
  // zOff += zInc;
}
