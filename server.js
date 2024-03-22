/**
 * This script sets up a basic Express server for handling user registration, login,
 * adding grades, and fetching grades. It utilizes MongoDB for data storage and encryption
 * for securing sensitive information. The server serves a React frontend from the 'mern/build' directory.
 * 
 * Routes:
 * 1. POST /api/register - Registers a new user.
 * 2. POST /api/login - Logs in an existing user.
 * 3. POST /api/user/add/grade - Adds a grade for a user.
 * 4. POST /api/user/grades - Retrieves grades for a user.
 * 5. GET * - Serves the React frontend.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Custom encryption module
const { MessageCryptor } = require("./encryption");

// Port configuration
const PORT = 4000;

// MongoDB connection URL
const URL = "mongodb://localhost:27017/trivia";

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, './mern/build')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define MongoDB schema for users
const userScheme = new db.Schema({
    userId: String,
    userName: String,
    password: String,
    grades: Array
});

// Create user model
const userModel = new db.model("users", userScheme);

// Connect to MongoDB
db.connect(URL).then(() => {
    console.log("DB IS ON!");
});

// User registration endpoint
app.post("/api/register", async (req, res) => {
    const myCryptor = new MessageCryptor(32);
    let temp = {
        userName: req.body.userName,
        password: myCryptor.encrypt(req.body.password),
        userId: uuidv4()
    };
    let isExisting = await userModel.find({ userName: temp.userName });
    if (isExisting.length > 0) res.json({ status: 0, data: {}, errors: ["user already exists"] });
    else {
        temp.grades = [];
        await userModel.insertMany(temp);
        res.json({ status: 1, data: {}, errors: [] });
    }
});

// User login endpoint
app.post("/api/login", async (req, res) => {
    const myCryptor = new MessageCryptor(32);
    let temp = {
        userName: req.body.userName,
        password: req.body.password
    };
    let isExisting = await userModel.findOne({ userName: temp.userName });
    if (isExisting) {
        if (temp.password === myCryptor.decrypt(isExisting.password)) res.json({ status: 1, data: {}, errors: [] });
        else res.json({ status: 0, data: {}, errors: ["Please put the right password"] });
    } else {
        res.json({ status: 0, data: {}, errors: ["user does not exist"] });
    }
});

// Endpoint to add grade for a user
app.post("/api/user/add/grade", async (req, res) => {
    let { grade, userName } = req.body;
    let isExisting = await userModel.findOne({ userName });
    isExisting.grades.push(grade);
    await userModel.findOneAndUpdate({ userName }, isExisting);
    res.json({ status: 1, data: { msg: "Grade added" }, errors: [] });
});

// Endpoint to fetch grades for a user
app.post("/api/user/grades", async (req, res) => {
    let { userName } = req.body;
    let userObj = await userModel.findOne({ userName });
    if (userObj) res.json({ status: 1, data: { grades: userObj.grades } });
    else res.json({ status: 0, data: {}, errors: ["user doesn't exist"] });
});

// Serve React frontend for any other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './mern/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log("Server is on!");
});
