function drawcave() {

// lil cave
  push();
  noFill();
  stroke(100, 100, 100);
  strokeWeight(190);
  bezier(-30, height, 150, height - 400, 250, height-50, 300, height);
   pop();

  // cavehole
 push();
 stroke(100,100,100);
 strokeWeight(20);
 fill(0,0,0)
 ellipse(270, height-100, 150, 250)
 pop();

// outer stone
  push();
  noFill();
  stroke(70, 70, 70);
  strokeWeight(190);
  bezier(150, height, 100, height - 100, 150, height - 10, 200, height);
  pop();



}