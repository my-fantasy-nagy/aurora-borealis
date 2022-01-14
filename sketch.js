//Aurora borealis like sketch using 3D noise and flow fields


//Inspired by Daniel Schifmann's Perlin Noise Flow Field Example
//https://www.youtube.com/watch?v=BjoM9oKOAKY


let inc = 0.1;
let scl = 10;
let cols, rows;

let fr;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
}

function draw() {
  var yOff = 0.0;

  for(var y = 0; y < rows; y ++){
    var xOff = 0;
    for(var x = 0; x < cols; x ++){
      var index = (x + y * width) * 4;
      xOff += inc;

      fill(noise(xOff, yOff)* 255);
      rect(x * scl, y * scl, scl, scl);
    }
    yOff+= inc;
    
    fr.html(floor(frameRate()));
  }
}
