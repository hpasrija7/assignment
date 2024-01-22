document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Front-end validation
    if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
        alert("All fields are required!");
        return;
    }

    // Submit data to Node.js server
    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, username, password, confirmPassword }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display the response from the server
    })
    .catch(error => console.error("Error:", error));
});
