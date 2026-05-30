

let pufferfish;
let crabmusic;
let boat;
let bubble;
let deathSound;
let destructionSound;

let mousePressedCount = 0; 



// we now use async/await instead of preload because 
// of the new version of p5 (here we use p5 2.0+), which means that the sound is now basically "waiting" 
// with its loading until it needs to play
async function setupSound() {
pufferfish = await loadSound('pufferfish.mp3');
boat = await loadSound('boat.mp3');
bubble = await loadSound('bubble.mp3');
crabmusic = await loadSound('crabmusic.mp3');
deathSound = await loadSound('deathSound.mp3');
destructionSound = await loadSound('deathSound.mp3');

//playing the background music
   crabmusic.amp(0.4);  // changing the volume of the background music, 0 = silent, 1 = full volume
   crabmusic.loop();
   crabmusic.play();

   deathSound.amp(10); 
   deathSound.loop();
   deathSound.play();
 

   destructionSound.amp(2); 
   destructionSound.loop();
   destructionSound.play();

}




// making the bubble pop sound, for each bubble 

let prevBubbleCount = 0;

function drawSound() {
  if (bubbles.length > prevBubbleCount) {
    bubble.amp(0.5);  
    bubble.play();
  }
  prevBubbleCount = bubbles.length;  // since the bubble count increases and then decreases when they are out of frame
  // we 'match' the previous bubble count with the current amount in the frame in question, so it keeps 
  // updating and comparing 

 
    if (deathSound) deathSound.amp(backwardsMotionFilter);
    if (destructionSound) destructionSound.amp(backwardsMotionFilter);
    if (crabmusic) crabmusic.amp(motionFilter);



/*
  // playing boat horn on first mouse click (and not pufferfish sound too)
  if (mouseIsPressed) {
    mousePressedCount += 1
}   
   if (mousePressedCount == 1) {
        boat.play(); 
       // pufferfish.amp(0); 
   } else {
    // pufferfish.amp(1); 
    // making a pufferfish sound for mouse when clicked, as a signifier that the mouse doesnt work
		pufferfish.play(); 
   }



*/

}








	


function mousePressed() {

    userStartAudio(); //to make sure the audio plays in the browser when clicked

    pufferfish.play(); 

}




   