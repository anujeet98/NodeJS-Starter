

const path = require('path');
const productModel = require('../models/productModel.js');

exports.getShop = (req,res,next) => {
    //fetch the data from file and log here
    productModel.fetchAllProducts((products)=>console.log("Shop Page output products added: ",products));

    res.sendFile(path.join(__dirname,"..","views","shop.html"));
    // console.log('welcome to express JS');
    // res.send('<h1>Welcome to Express JS</h1>');
    // next();
};