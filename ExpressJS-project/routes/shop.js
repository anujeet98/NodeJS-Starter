const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname,"..","views","shop.html"));
    // console.log('welcome to express JS');
    // res.send('<h1>Welcome to Express JS</h1>');
    // next();
});

router.get('/contactus',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","contactus.html"));
});

router.post('/success',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","success.html"));
});


module.exports = router;