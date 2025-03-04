document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("video");
    const captureButton = document.getElementById("capture");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const faceDataInput = document.createElement("input"); // Hidden input for storing face data
    faceDataInput.type = "hidden";
    faceDataInput.name = "faceData";
    const form = document.getElementById("patientForm");

    // Append hidden input to form
    form.appendChild(faceDataInput);

    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing webcam:", err);
        });

    // Capture the face
    captureButton.addEventListener("click", function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the image to Base64
        const faceData = canvas.toDataURL("image/png");
        faceDataInput.value = faceData;

        // Display pop-up message for successful face scan
        showPopup("✅ Face scan successful!");
    });

    // Handle form submission (without backend, just show popup)
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        showPopup("✅ Registration Successful! 🎉");
    });

    // Function to show pop-up message
    function showPopup(message) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.background = "#fff";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.textAlign = "center";
        popup.style.zIndex = "1000";
        popup.style.width = "250px";

        const messageText = document.createElement("p");
        messageText.innerText = message;
        messageText.style.marginBottom = "10px";

        const okButton = document.createElement("button");
        okButton.innerText = "OK";
        okButton.style.padding = "8px 16px";
        okButton.style.background = "#4CAF50";
        okButton.style.color = "#fff";
        okButton.style.border = "none";
        okButton.style.cursor = "pointer";
        okButton.style.borderRadius = "5px";
        okButton.addEventListener("click", function() {
            document.body.removeChild(popup);
        });

        popup.appendChild(messageText);
        popup.appendChild(okButton);

        document.body.appendChild(popup);
    }
});
