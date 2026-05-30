

function drawCrab (x, y) {
  push();
  translate(x, y);
  scale(0.5)

//removes black outline
strokeWeight(0)

//left claw
fill(260, 40, 70)    
arc(70, 100, 50, 150, -1, 2, open)
fill(260, 40, 70)    
arc(50, 100, 50, 150, 1, -2, open) 

//right claw
fill(260, 40, 70)    
arc(320, 100, 50, 150, -1, 2, open)
fill(260, 40, 70)    
arc(300, 100, 50, 150, 1, -2, open)  
  
//body
fill(260, 40, 70)    
ellipse(190, 270, 270, 120)
  
//right eye
fill(260, 40, 70)    
ellipse(140, 170, 40, 120)
fill(255, 255, 255)    
ellipse(140, 170, 30, 90)
fill(0, 0, 0)    
ellipse(145, 170, 10, 15)

//left eye
fill(260, 40, 70)    
ellipse(230, 170, 40, 120)
fill(255, 255, 255)    
ellipse(230, 170, 30, 90)
fill(0, 0, 0)    
ellipse(235, 170, 10, 15)
  
//mouth open
fill(255, 255, 255)    
ellipse(200, 270, 100, 40)
stroke(0, 0, 0) 
strokeWeight(5);
line(150, 270, 249, 270)
  
// left arm
stroke(260, 40, 70) 
strokeWeight(7);
line(60, 170, 100, 250)
  
// right arm
stroke(260, 40, 70) 
strokeWeight(7);
line(310, 170, 280, 250)
  

// left leg nr1 - yderst
stroke(260, 40, 70) 
strokeWeight(7);
line(120, 280, 50, 350)

// left leg nr2 - midterst
stroke(260, 40, 70) 
strokeWeight(7);
line(120, 280, 90, 360)

// left leg nr3 - inderst
stroke(260, 40, 70) 
strokeWeight(7);
line(130, 280, 130, 365)
  
// right leg nr1 - yderst
stroke(260, 40, 70) 
strokeWeight(7);
line(270, 290, 280, 360)
  
// right leg nr2 - midterst
stroke(260, 40, 70) 
strokeWeight(7);
line(280, 290, 320, 355)
  
// right leg nr3 - inderst
stroke(260, 40, 70) 
strokeWeight(7);
line(300, 290, 350, 350)

  pop();
}



