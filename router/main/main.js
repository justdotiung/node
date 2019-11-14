const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req,res) =>{
    console.log("main js :",req.user);
    //세션저장
    const id = req.user;
    res.render('main.ejs',{ 'id' : id});
}); 

module.exports =router;