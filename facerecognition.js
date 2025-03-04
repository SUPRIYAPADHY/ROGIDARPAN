function startCamera() {
    let video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error("Error accessing camera: ", error);
        });
}
function scanFace() {
    alert("Face scanned successfully! Retrieving patient data...");
    
    // Dummy Patient Data (To be replaced with real face recognition result)
    let patientData = {
        name: "swarup sahu",
        age: "21",
        bloodGroup: "O+",
        contact: "9876543210",
        history: "Hypertension"  
    };

    // Display Patient Data
    document.getElementById("name").textContent = patientData.name;
    document.getElementById("age").textContent = patientData.age;
    document.getElementById("bloodGroup").textContent = patientData.bloodGroup;
    document.getElementById("contact").textContent = patientData.contact;
    document.getElementById("history").textContent = patientData.history;

    document.getElementById("patientInfo").style.display = "block";
}

// Start Camera on Page Load
window.onload = startCamera;
