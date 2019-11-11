const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
//db setting
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3305,
    user : 'studyuser',
    password : '1234',
    database : 'studydb'
});
connection.connect();
router.post("/form",(req,res) => {
    const a =req.body.email;
    //res.send("post response" +a);
    res.render('email.ejs',{'email' : req.body.email});
});

router.post("/ajax",(req,res) => {
    //console.log(req.body.email)
    // const result = {
    //     'result' : "ok",
    //     "email" : req.body.email
    // }

    result={};
    const email = req.body.email;
        
    const query = connection.query("select * from user where email = ?",[email],(err,rows) => {
        if(err)
            throw err;
        console.log('row : ' ,rows[0])
        result.name = rows[0].name;
        result.email = rows[0].email;
        console.log(result.name)
        res.json(result); 
    })
});

module.exports =router;

