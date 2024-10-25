let bodySegmentation;
let video;
let segmentation;

let options = {
  maskType: "parts",
};

function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);
}

function draw() {
  background(255);
  image(video, 0, 0);
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}

// callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}
