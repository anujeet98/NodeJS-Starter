const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(p => p.id===this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.error("WriteError-UpdateProduct: ",err);
        });
      }
      else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.error("WriteError-AddProduct: ",err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(productId, cb){
    getProductsFromFile((products)=>{
        const product = products.find(p => p.id === productId);
        cb(product);
    });
  }

  static deleteproductbyID(productId){
    getProductsFromFile((products)=>{
      const updatedProducts = products.filter(p => p.id!=productId);
      fs.writeFile(p,JSON.stringify(updatedProducts), (err)=>{
        if(err){
          console.error("WriteError-DeleteProduct: ",err);
        }
      })
  });
  }
};