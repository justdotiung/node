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

router.get('/list',(req,res) => {
    res.render('movie.ejs');
});

router.get('/',(req,res) => {
    result={}; 
        
    const query = connection.query("select * from movie",(err,rows) => {
        if(err)
            throw err;
        if(rows.length){
            result.result = 1;
            result.data = rows;    
            console.log(rows);
        }else {
            result.result = 0;
        }
        res.json(result); 
    });
});

router.post('/',(req,res) => {
    const title = req.body.title;
    const type = req.body.type;
    const grade = req.body.grade;
    const acter = req.body.actor;

    const user = {title, type, grade, acter}
    const query = connection.query("insert into movie set ?",user,(err,rows) => {
        if(err)
            throw err;
        return res.json({'result' : 1});
    });
    
});

router.get('/:title',(req,res) => {
    result={}; 
    const title = req.params.title;     
    const query = connection.query("select * from movie where title = ?",title,(err,rows) => {
       console.log(rows);
        if(err)
            throw err;
        if(rows.length){
            result.result = 1;
            result.data = rows;    
        }else {
            result.result = 0;
        }
        res.json(result); 
    });
});

router.delete('/:title',(req,res) => {
    result={}; 
    const title = req.params.title;
        
    const query = connection.query("delete from movie where title = ?",title,(err,rows) => {
        if(err)
            throw err;
        if(rows.affectedRows > 0){
            result.result = 1;
            result.data = title;    
        }else {
            result.result = 0;
        }
        res.json(result); 
    });
});

router.put('/:title',(req,res) => {
    const title = req.body.title;
    const type = req.body.type;
    const grade = req.body.grade;
    const acter = req.body.actor;

   console.log(title);
})

module.exports =router;

