const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "hpasrija",
    password: "Password123",
    database: "userdata",
    insecureAuth: true
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }

    console.log("Connected to MySQL database");
});

app.use(express.static(path.join(__dirname, 'public')));

app.post("/submit", (req, res) => {
    const { firstName, lastName, email, username, password, confirmPassword } = req.body;
    console.log("Received data:", firstName, lastName, email, username, password, confirmPassword);

    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }

    // Insert data into the database
    const query = "INSERT INTO UserData (firstName, lastName, email, username, password, confirmPassword) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [firstName, lastName, email, username, password, confirmPassword], (err, results) => {
        if (err) {
            console.error("Error saving data to the database:", err);
            res.status(500).json({ message: "Error saving data to the database" });
        } else {
            res.json({ message: "Data saved successfully!" });
        }
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
