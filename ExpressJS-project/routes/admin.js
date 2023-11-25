const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res) => {
    // res.send('<form method="post" action="/product"><input type="text" name="product" placeholder="product name"><input type="text" name="size" placeholder="size"><input type="submit" value="submit"></form>')
    res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

router.post('/product', (req,res)=>{
    console.log(req.body);
    res.redirect('/shop');
});

module.exports = router;