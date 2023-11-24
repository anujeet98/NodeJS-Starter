const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res) => {
    res.send('<form method="post" action="/product"><input type="text" name="product" placeholder="product name"><input type="text" name="size" placeholder="size"><input type="submit" value="submit"></form>')
});

router.post('/product', (req,res)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;