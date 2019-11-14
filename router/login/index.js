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
    res.render('login.ejs',{'message' : msg});
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
passport.use('local-login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pw',
        passReqToCallback : true
    }, (req, email, pw, done) => {
        const query = connection.query("select * from user where email = ?",email,(err,rows) => {
            if(err) return done(err);

            if(rows.length){
                console.log('existed user');
                return done(null, {'email' : email ,'id' : rows[0].id});
            }else{
                 return done(null,false,{'message' :'your login info is not found'})
            }
        })
    }
));

router.post('/', (req,res,next) => {
    passport.authenticate('local-login', (err,user,info) => {
        if(err) res.status(500).json(err);
        if(!user) res.status(401).json(info.message);

        req.logIn(user, function(err) {
             if (err) { return next(err); 
            }
            return res.json(user);
        });
    })
    (req, res, next);
});


module.exports = router;