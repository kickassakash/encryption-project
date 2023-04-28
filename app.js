require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
var session = require('express-session');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
//mongoose-encryption module is low level security so we use md5 instead
//const encryption = require('mongoose-encryption');


const app = express();
app.set("view engine",'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/userDB");



const user_schema = new mongoose.Schema({
    email: String,
    password: String
})
//this commented code is used for mongoose-encryption package
//user_schema.plugin(encryption,{secret: process.env.SECRET, encryptedFields:['password']});

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
    //code used for bcrypt encryption   
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     let new_user = new user({
    //         email: req.body.username,
    //         password: hash
    //     })
    //     new_user.save().then(() => {
    //         console.log("successfully registered!");
    //     })
    //     res.render("secrets");
    // })
    
});

app.post("/login", (req, res) => {
    
    //code used for bcrypt login
    // user.findOne({email:req.body.username}).then((docs)=>{
    //     bcrypt.compare(req.body.password, docs.password, function(err, result) {
    //         if(result === true){
    //             console.log("docs found!");
    //             console.log(docs);
    //             res.render("secrets");
    //         }
    //         else{
    //             console.log("No docs found!");
    //             res.render("login");
    //         }
    //     });
        
    // });
})




app.listen(3000, ()=>{
    console.log("listening on port 3000");
})