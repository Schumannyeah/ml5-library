let video;
let bodyPose;
let poses = [];
let connections = null;  // Initialize to null to avoid undefined access
let modelLoaded = false;
let videoLoaded = false;

function preload() {
  // Load the bodyPose model and set the flag when done
  bodyPose = ml5.bodyPose(() => {
    console.log("BodyPose model loaded successfully.");
    modelLoaded = true;
    // Get the skeleton connections once the model is fully loaded
    connections = bodyPose.getSkeleton();
    startDetectionIfReady();
  });
}

function setup() {
  createCanvas(800, 600);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();

  console.log("Video is created:", video);

  // Set video load flag when ready
  video.elt.onloadeddata = () => {
    console.log("Video loaded, attempting to start detection...");
    videoLoaded = true;
    startDetectionIfReady();
  };
}

function startDetectionIfReady() {
  if (modelLoaded && videoLoaded) {
    try {
      console.log("Starting pose detection...");
      bodyPose.detectStart(video, gotPoses);
    } catch (error) {
      console.error("Error starting pose detection:", error);
    }
  } else {
    console.log("Waiting for both video and model to be loaded...");
  }
}

function draw() {
  // Only draw if the model is loaded and connections are available
  if (modelLoaded && connections !== null) {
    image(video, 0, 0, width, height);

    // Draw the skeleton connections
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
      if (pose && pose.keypoints) {  // Check if the pose is valid
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
    }

    // Draw all the tracked landmark points
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
      if (pose && pose.keypoints) {  // Check if the pose is valid
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
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  poses = results;
}
