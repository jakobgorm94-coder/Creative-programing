

class Turtle {
    constructor(length, angle) {
      this.length = length;
      this.angle = angle;
    }
  
    render(sentence) {
      //stroke(255, 100, 80); // coral color (red, green, blue) 255, 100, 80
      strokeWeight(5);      // thickness of the branches
      
       
      colorMode(HSL);
      stroke(7,100*motionFilter, 66);
      


      let r = this.angle + (sin(frameCount*0.05)*0.1) * motionFilter;
      for (let i = 0; i < sentence.length; i++) {
        let c = sentence.charAt(i);
        if (c === "F") {
          line(0, 0, 0, -this.length);
          translate(0, -this.length);
        } else if (c === "G") {
          translate(0, -this.length);
        } else if (c === "+") {
          rotate(r);
        } else if (c === "-") {
          rotate(-r);
        } else if (c === "[") {
          push();
        } else if (c === "]") {
          pop();
        }
      }
    }
  
  }
  
  