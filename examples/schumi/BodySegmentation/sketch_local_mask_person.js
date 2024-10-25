let bodySegmentation;
let video;
let segmentation;
let modelLoaded = false;
let videoLoaded = false;

let options = {
  maskType: "person",
};

function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", options,() => {
    console.log("BodySegmentation model loaded successfully.");
    modelLoaded = true;
    startDetectionIfReady();
  });
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
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
      console.log("Starting BodySegmentation detection...");
      bodySegmentation.detectStart(video, gotResults);
    } catch (error) {
      console.error("Error starting BodySegmentation detection:", error);
    }
  } else {
    console.log("Waiting for both video and model to be loaded...");
  }
}

function draw() {
  background(0, 255, 0);

  if (segmentation) {
    video.mask(segmentation.mask);
    image(video, 0, 0);
  }

  // Only draw if the model is loaded
  if (modelLoaded) {
    background(0, 255, 0);
    if (segmentation) {
        video.mask(segmentation.mask);
        image(video, 0, 0);
    }
  }
}

// callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}
