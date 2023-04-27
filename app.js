require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const encryption = require('mongoose-encryption');


const app = express();
app.set("view engine",'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/userDB");



const user_schema = new mongoose.Schema({
    email: String,
    password: String
})
user_schema.plugin(encryption,{secret: process.env.SECRET, encryptedFields:['password']});

const user = mongoose.model("User",user_schema);


app.get("/", (req, res) => {
    res.render("home");
    
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.route("/register")
.get((req, res) => {
    res.render("register");
})
.post((req, res) => {
    let new_user = new user({
        email: req.body.username,
        password: req.body.password
    })
    new_user.save().then(() => {
        console.log("successfully registered!");
    })
    res.render("secrets");
});

app.post("/login", (req, res) => {
    user.findOne({email:req.body.username}).then((docs)=>{
        if(docs.password === req.body.password){
            console.log("docs found!");
            console.log(docs);
            res.render("secrets");
        }
        else{
            console.log("No docs found!");
            res.render("login");
        }
    });
})




app.listen(3000, ()=>{
    console.log("listening on port 3000");
})