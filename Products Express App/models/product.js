const db = require('../util/db.js');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id){
      return db.execute('UPDATE products set title=?, imageUrl=?, description=?, price=? WHERE id=?',[this.title, this.imageUrl, this.description, this.price, this.id]);
    }
    else{
      return db.execute("INSERT INTO products(`title`,`imageUrl`,`description`,`price`) VALUES(?, ?, ?, ?)",[this.title, this.imageUrl, this.description, this.price]);
    }
  }

  static fetchAll() {
      return db.execute('SELECT * FROM products');
  }

  static findById(productId){
    return db.execute('SELECT * FROM products WHERE products.id=?',[productId]);
  }

  static deleteproductbyID(productId){
    return db.execute('DELETE FROM products WHERE products.id=?',[productId]);
  }
};
