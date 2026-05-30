
// --- code for mic ---
let mic;
let amp;
// ------------let reverb;


function setupMic() {
    // ved ikke om det er nødvendigt.
    //userStartAudio();

    mic = new p5.AudioIn();
    mic.start();

    // used to measure the sound level received from mic.
    amp = new p5.Amplitude();
    amp.setInput(mic);

    // --- mumbeling under water. ---
    // reverb = new p5.LowPass();  // filters out high frequencies and lets low through.
    // reverb.freq(800);   // high frequencies above will be filtered out.

    //-------- reverb = new p5.Reverb();

    // connects the mic to filter, reverb, and the output.
    //mic.connect(reverb);
    //reverb.set(3);
    //reverb.connect(filter);
    //filter.connect(); 
    
    // ------- reverb.set( 3, 2);

    // -------- reverb.connect();
}
/*

   // midlertidig delay effect
    mic = new p5.AudioIn();
    mic.start();

    amp = new p5.Amplitude();
    amp.setInput(mic);

    let delay = new p5.Delay();
    delay.process(mic, 0.12, 0.7, 2300);
    // delay.amp(8)


}
*/
function drawMic() {
    let level = amp.getLevel();   // sound level received from mic.

    return amp.getLevel();   // returns the sound level so other sketches can use it.
}