const API_URL = "https://2ev2i7464a.execute-api.ap-south-1.amazonaws.com/prod/apply";

document.getElementById('appForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgDiv = document.getElementById('msg');
    msgDiv.innerText = "Submitting application...";
    msgDiv.style.color = "orange";

    const payload = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        qualification: document.getElementById('qualification').value.trim(),
        experience: document.getElementById('experience').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        coverLetter: document.getElementById('coverLetter').value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();

        if (response.ok) {
            msgDiv.innerText = result.message;
            msgDiv.style.color = "green";
            document.getElementById('appForm').reset();
        } else {
            msgDiv.innerText = "Error: " + (result.error || "Submission failed");
            msgDiv.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        msgDiv.innerText = "Failed to communicate with backend.";
        msgDiv.style.color = "red";
    }
});