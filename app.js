var express = require("express");
var app = express();
const main = require('./router/main');
const index = require('./router/index');
const email = require('./router/email');

// var bodyPaser = require("body-parser");
//mysql 


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

app.listen(3000, function(){
    console.log("strat");
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/main',main);
app.use('/',index);
app.use('/email',email);

app.set("view engine", "ejs");



