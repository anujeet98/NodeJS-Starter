const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addToCart = (prodId, productPrice) => {
        //fetch cart from files
        fs.readFile(p, (err,data) => {
            let cart = {products: [], totalPrice: 0};
            if(err){
                console.error('CartReadError: ',err);
            }
            else{
                cart = JSON.parse(data);
            }
            //analyze product
            const existingProductIndex = cart.products.findIndex(p => p.id===prodId);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add to cart 
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id: prodId, qty: 1};
                cart.products = [...cart.products,updatedProduct];
            }

            cart.totalPrice = cart.totalPrice+ +productPrice;
            //write to file
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.error('CartWriteError: ',err);
            });
        })
        
        
    }
}