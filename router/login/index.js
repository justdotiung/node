const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req,res) =>{
    //res.send("hi friendfff~!")
    console.log("main js :",req.user);
    //console.log("main js :",id);   
    //res.sendFile(path.join(__dirname ,"../../public/main.html"));
    res.render('main.ejs',{ 'id' : req.user});
}); 

module.exports =router;