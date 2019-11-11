var express = require("express");
var app = express()
// var bodyPaser = require("body-parser");
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3305,
    user : 'studyuser',
    password : '1234',
    database : 'studydb'
});

connection.connect();

app.listen(3000, function(){
    console.log("strat");
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs")

app.get('/', (req,res) =>{
 //res.send("hi friendfff~!")
 res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', (req,res) =>{
    //res.send("hi friendfff~!")
    res.sendFile(__dirname + "/public/main.html")
   }) 

app.post("/email_post",(req,res) => {
    const a =req.body.email;
    //res.send("post response" +a);
    res.sendFile(__dirname + "/public/main.html")
});

app.post("/ajax_send_email",(req,res) => {
    console.log(req.body.email)
    const result = {
        'result' : "ok",
        "email" : req.body.email
    }
    res.json(result);
});