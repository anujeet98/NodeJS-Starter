const express = require('express');
const path = require('path');

const router = express.Router();

const contactController = require('../controllers/contactCtrl');

router.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname,"..","views","shop.html"));
    // console.log('welcome to express JS');
    // res.send('<h1>Welcome to Express JS</h1>');
    // next();
});

router.get('/contactus',contactController.getContactUs);

router.post('/success',contactController.getSuccessPage);


module.exports = router;