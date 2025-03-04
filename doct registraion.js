document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("doctorForm");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture");

    // Handle form submission with validation
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const specialization = document.getElementById("specialization").value.trim();
        const experience = document.getElementById("experience").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!name || !email || !phone || !specialization || !experience || !password) {
            showPopup("⚠️ Please fill all fields.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showPopup("⚠️ Please enter a valid email address.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            showPopup("⚠️ Please enter a valid 10-digit phone number.");
            return;
        }

        showPopup("✅ Registration Successful! 🎉");
    });

    // Access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error("Error accessing camera:", error);
        });

    // Capture face scan
    captureButton.addEventListener("click", () => {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        showPopup("✅ Face scanned and enrolled successfully! 🎭");
    });

    // Function to show a custom pop-up message
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
