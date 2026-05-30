function drawConch(x, y) {
  let a = 4;     // how small the center starts
  let b = 0.2;   // how fast the spiral grows outward
  let turns = 3; // how many times it winds around



  

  push();
  translate(x, y);
  scale(0.3)
  colorMode(HSL);

  push(); 
  fill(351, 35*(motionFilter/1.5), 60);
  noStroke();
  ellipse(30, -20, 280, 240);
  pop();

  stroke(23, 42*(motionFilter/1.2), 62);
  strokeWeight(17);
  noFill();

  beginShape();
  for (let theta = 0; theta < turns * TWO_PI; theta += 0.05) {
    let r = a * exp(b * theta); // the spiral formula
    let x = r * cos(theta);     // convert to x
    let y = r * sin(theta);     // convert to y
    vertex(x, y);
  }
  endShape();

  pop();
}
