let video;
// This variable will store the ml5.js bodyPose model, which detects body pose landmarks.
let bodyPose;
// This array will hold the pose detection results. Each entry will contain data about detected landmarks.
let poses = [];
// This will hold the information about which keypoints should be connected to form the skeleton.
let connections;

// preload(): A special function in p5.js that runs before setup().
// It is typically used to load assets like images or models.
function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  // Hides the video element, so it doesn't appear separately on the webpage.
  // Instead, the video is drawn directly onto the canvas.
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

// The draw() function in p5.js runs continuously, updating the canvas.
function draw() {
  // Draw the webcam video
  // the para width & height come from the canvas
  image(video, 0, 0, width, height);

  // Draw the skeleton connections
  // Iterates over all detected poses (usually, there will be only one in a webcam feed).
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterates over all pairs of keypoints that need to be connected to draw the skeleton.
    for (let j = 0; j < connections.length; j++) {
      // Get the indices of two keypoints (e.g., left shoulder and left elbow) to be connected.
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      // Get the keypoint objects for the two indices
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterates over each keypoint in the pose.
    for (let j = 0; j < pose.keypoints.length; j++) {
      // Gets the keypoint data (like x, y coordinates and confidence).
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
