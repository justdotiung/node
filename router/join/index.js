const express = require("express");
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

router.get('/',(req,res) => {
    //res.sendFile(path.join(__dirname,'../../public/join.html'));
    res.render('join.ejs');
});

passport.use('local-join',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'pw',
    passReqToCallback : true
}, (req,email,pw,done) => {
    console.log('local-join callback call')
}
));
// router.post('/',(req,res) => {
//     const email = req.body.email;
//     const name = req.body.name;
//     const pw = req.body.pw;

//     const params ={
//         email : email,
//         name : name,
//         pw : pw
//     }

//     const query = connection.query("insert into user set ?",params,(err,rows) => {
//         if(err) throw err;
//         console.log("db ok");

//         res.render('welcome.ejs',{'email' : email, 'name' : name})
//     })
// });
module.exports = router;