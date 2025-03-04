async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
}

async function startVideo() {
  const video = document.getElementById("video");
  navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => video.srcObject = stream)
      .catch(err => console.error("Error accessing webcam:", err));
}

async function recognizeFace() {
  const video = document.getElementById("video");
  const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
  
  if (!detections) {
      alert("Face not recognized. Try again!");
      return;
  }

  // Simulated authentication (Replace with actual backend verification)
  alert("Face recognized! Logging in...");
  window.location.href = "doc_dashboard.html"; // Redirect to dashboard
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadModels();
  startVideo();
});

document.getElementById("faceScanLogin").addEventListener("click", recognizeFace);

function redirectToDashboard(event) {
  event.preventDefault(); // Prevent form submission
  window.location.href = "/doc_dashboard.html"; // Redirect to doctor dashboard
}
