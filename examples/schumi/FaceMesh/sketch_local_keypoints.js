let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let modelLoaded = false;
let videoLoaded = false;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options, () => {
    console.log("FaceMesh model loaded successfully.");
    modelLoaded = true;
    startDetectionIfReady();
  });
}

function setup() {
  createCanvas(800, 600);
  // Create the webcam video and hide it
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
      console.log("Starting face detection...");
      faceMesh.detectStart(video, gotFaces);
    } catch (error) {
      console.error("Error starting face detection:", error);
    }
  } else {
    console.log("Waiting for both video and model to be loaded...");
  }
}

function draw() {
  // Only draw if the model is loaded and connections are available
  if (modelLoaded) {
    // Draw the webcam video
    image(video, 0, 0, width, height);
    // Draw all the tracked face points
    for (let i = 0; i < faces.length; i++) {
        let face = faces[i];
        for (let j = 0; j < face.keypoints.length; j++) {
            let keypoint = face.keypoints[j];
            fill(0, 255, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 5);
        }
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}