const express = require('express');
const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shopController.js');
const contactController = require('../controllers/contactController.js');

router.get('/', shopController.getShop);

router.get('/contactus',contactController.getContactUs);

router.post('/success',contactController.getSuccessPage);


module.exports = router;