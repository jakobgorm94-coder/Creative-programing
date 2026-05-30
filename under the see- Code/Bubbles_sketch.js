let bubbles = [];

function setupBubbles() {
}

function drawBubbles(positions) {
    // calculate the distance between the upper and lower lip.
    if (positions){
        let closeMouth = dist(
            positions[57][0], positions[57][1],
            positions[60][0], positions[60][1]
        );
    
        // if the distance is bigger then xx pixels the mouth is considered open.
        if(closeMouth >= 10){
      
            // finds the center of the mouth.
            let mouthX = mirrorX((positions[57][0] + positions[60][0]) / 2);
            let mouthY = (positions[57][1] + positions[60][1]) / 2;
      
            // creates bubbles from the mouth. the framecount makes sure they only spawn every 5 frames.
            if(frameCount % 5 == 0){
                bubbles.push({ 
                x: mouthX + random(-10,10),
                y: mouthY,
                size: random(15,45),
                speed: random(0.5,2)
                });
            }
        }
    }

    // draws the bubbles and removes them when they leaves the screen.
    for(let i = bubbles.length-1; i >= 0; i--){   // loops backward through the list so we can remove them without messing up the loop.
    
        let b = bubbles[i];
    
        fill(200,220,255,150);
        stroke(180,200,255);
        circle(b.x, b.y, b.size);
    
        b.y -= b.speed; // makes the bubbles move upwards.
    
        // removes the bubble when it leave the screen.
        if(b.y < 0){
            bubbles.splice(i,1);
        }
    }
}

