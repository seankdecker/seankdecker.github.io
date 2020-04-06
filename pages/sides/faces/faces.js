const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tnyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)


function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
    );
}

video.addEventListener('play', () => {
  setInterval(async () => {
    const detection = await faceapi.detectAllFaces(video,
      new faceapi.tinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();
    console.log(detection);
  }, 100);
})