let lsystem;
let turtle;

function setupCoral() {
  let rules = {
    F: "FF+[+F-F-F]-[-F+F+F]",
  };
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(10, radians(25));

  for (let i = 0; i < 3; i++) {
    lsystem.generate();
  }
}

function drawCoral(x, y) {
  push();
  translate(x, y);
  turtle.render(lsystem.sentence);
  pop();
}