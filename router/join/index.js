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
   let msg;
   const errMsg = req.flash('error');
   if(errMsg)
        msg = errMsg;
    res.render('join.ejs',{'message' : msg});
});

passport.serializeUser(function(user, done) {
    console.log("passport session save : ", user.id);
    done(null, user.id);
  });
//페이지요청이있을시 거치게 된다.
passport.deserializeUser((id, done) => {
        console.log("passport session save2 : ", id);
        done(null, id);
});

  //strategy 를 만들어 별도의 방법생성
passport.use('local-join',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pw',
        passReqToCallback : true
    }, (req, email, pw, done) => {
        const query = connection.query("select * from user where email = ?",email,(err,rows) => {
            if(err) return done(err);

            if(rows.length){
                console.log('existed user');
                return done(null, false, {message : 'your email is already used'});
            }else{
                const user = {email :email , pw : pw}
                const query = connection.query("insert into user set ?",user,(err,rows) => {
                    if(err)
                        throw err;
                    return done(null,{'email' : email ,'id' : rows.insertId})
                })
            }
        })
        
        //console.log('local-join callback call');
    }
));

router.post('/',passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true })
);
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