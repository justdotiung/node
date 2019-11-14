var express = require("express");
var app = express();
const louter = require('./router/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash'); 


app.listen(3000, function(){
    console.log("strat");
});

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
   }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(louter);




// var bodyPaser = require("body-parser");

//promise를 사용하는 mysql2
/*
const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({
    host : 'localhost',
    port : 3305,
    user : 'studyuser',
    password : '1234',
    database : 'studydb'
})
const studydb = async() => {
    const connection2 = await pool.getConnection(async conn => conn);
};
*/