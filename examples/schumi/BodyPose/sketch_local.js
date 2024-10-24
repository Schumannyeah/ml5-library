let video;
let bodyPose;
let poses = [];
let connections;
let modelLoaded = false;
let errorMessage = '';

async function preload() {
  try {
    // Load the bodyPose model with explicit wait
    bodyPose = await ml5.bodyPose({
      modelType: 'singleposelight',
      enableSmoothing: true
    });
    modelLoaded = true;
  } catch (error) {
    console.error('Error loading model:', error);
    errorMessage = 'Failed to load the pose detection model';
  }
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  if (modelLoaded && bodyPose) {
    try {
      // Start detecting poses in the webcam video
      bodyPose.detectStart(video, gotPoses);
      // Get the skeleton connection information
      connections = bodyPose.getSkeleton();
    } catch (error) {
      console.error('Error starting detection:', error);
      errorMessage = 'Failed to start pose detection';
    }
  }
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  if (!modelLoaded || errorMessage) {
    // Display error message if model failed to load
    fill(255, 0, 0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(errorMessage || 'Loading model...', width/2, height/2);
    return;
  }

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
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
    for (let j = 0; j < pose.keypoints.length; j++) {
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