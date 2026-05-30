// --- code for webcam ---
let video;
let tracker;

// function to mirror the x coordinate because the webcam is mirrored.
function mirrorX(x) {
    return width - x;
}

function setupWebcam() {
    // --- code for webcam ---
    video = createCapture(VIDEO);   // start webcam
    video.size(windowWidth, windowHeight);  // size of the webcam feed
    video.hide();

    pixelDensity(1);
  
    tracker = new clm.tracker();    // create a new clm tracker
    tracker.init();             // initialize the tracker
    tracker.start(video.elt);   // start tracking the video feed
}

function drawWebcam() {
    
    let positions = tracker.getCurrentPosition();

    // makes it so the webcan is not mirrored.
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();

    // this has messed with the x coordinates so i need to mirror them back.
    // i do this by making a function that mirrors the x coordinate.

    return positions;   // returns the positions so other sketches can use them.


}

