const express = require("express");
const router = express.Router();
const path = require('path');
const main = require('./main/main');
const email = require('./email/email');
const join = require('./join/index');
const login = require('./login/index');


router.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname ,"../public/main.html"));
   });

router.use('/main',main);
router.use('/email',email);
router.use('/join',join);
router.use('/login',login);

module.exports =router;

