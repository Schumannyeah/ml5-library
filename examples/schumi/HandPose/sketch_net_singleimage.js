let handPose;
let video;
let hands = [];

// this must be run through python -m http.server 8000
// due to CORS restriction
function preload() {
  // Load the image to be detected
  img = loadImage("hand.jpg");
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Draw the image
  image(img, 0, 0);
  // Detect hands in an image
  handPose.detect(img, gotHands);
}

function draw() {
  // Draw all the hand keypoints
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
