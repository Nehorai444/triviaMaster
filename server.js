const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const db = require('mongoose')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const {MessageCryptor} = require("./encryption");

const PORT = 4000
const URL = "mongodb+srv://nehorai444:5wCw23dp4TWgIyyM@cluster0.mgyu73p.mongodb.net/trivia" //addHereYourConnectionStringOfMongoDB

app.use(express.static(path.join(__dirname, './mern/build')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const userScheme = new db.Schema({
    userId: String,
    userName: String,
    password: String,
    grades: Array
})
const userModel = new db.model("users", userScheme)

db.connect(URL).then(()=>{
    console.log("DB IS ON!")
})

app.post("/api/register", async (req, res) => {
    const myCryptor = new MessageCryptor(32)
    let temp = {
        userName: req.body.userName,
        password: myCryptor.encrypt(req.body.password),
        userId: uuidv4()
    }
    let isExisting = await userModel.find({userName: temp.userName});
    if(isExisting.length > 0) res.json({status: 0, data: {}, errors: ["user already exists"]});
    else {
        temp.grades = [];
        await userModel.insertMany(temp);
        res.json({status: 1, data: {}, errors: []})
    }
});

app.post("/api/login", async (req, res) => {
    const myCryptor = new MessageCryptor(32)
    let temp = {
        userName: req.body.userName,
        password: req.body.password
    }
    let isExisting = await userModel.findOne({userName : temp.userName});
    if(isExisting) {
        console.log(temp.password,myCryptor.decrypt(isExisting.password))
        if (temp.password === myCryptor.decrypt(isExisting.password)) res.json({status: 1, data: {}, errors: []});
        else res.json({status: 0, data: {}, errors: ["Please put the right password"]})
    } else {
        res.json({status: 0, data: {}, errors: ["user does not exist"]})
    }
});

app.post("/api/user/add/grade",async (req, res) => {
    let {grade, userName} = req.body;
    let isExisting = await userModel.findOne({userName});
    isExisting.grades.push(grade);
    await userModel.findOneAndUpdate({userName}, isExisting);
    res.json({status: 1, data: {msg: "Grade added"}, errors: []})
})

app.post("/api/user/grades", async (req, res) => {
    let {userName} = req.body;
    let userObj = await userModel.findOne({userName});
    if (userObj) res.json({status: 1, data: {grades: userObj.grades}});
    else res.json({status: 0, data: {}, errors: ["user doesn't exist"]})
});

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, './mern/build', 'index.html'))
});

app.listen(4000,()=>{
    console.log("server is on!")
})