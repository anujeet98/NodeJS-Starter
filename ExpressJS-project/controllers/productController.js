
const path = require('path');
const ProductModel = require(path.join(__dirname,"..","models","productModel.js"));

exports.getAddProduct = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
};


exports.postAddProduct = (req,res)=>{
    console.log(req.body);
    //write product to file
    const product = new ProductModel(req.body.product, req.body.size);
    product.save();

    res.redirect('/shop');
};