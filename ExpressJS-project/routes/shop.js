const express = require('express');

const router = express.Router();

router.get('/', (req,res,next) => {
    console.log('welcome to express JS');
    res.send('<h1>Welcome to Express JS</h1>');
    // next();
});

module.exports = router;