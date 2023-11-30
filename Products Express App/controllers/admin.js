const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = null;
  const product = new Product(id, title, imageUrl, description, price);
  product.save()
    .then(()=>{
      res.redirect('/');  
    })
    .catch(err => {
      console.error('writeError-postAddProduct',err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, filedata])=>{
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err=>{
      console.log('readError-getProducts-Admin',err);
    });
};


exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
      return res.redirect('/');
    }
    const productId  = req.params.productId;
    Product.findById(productId)
    .then(([rows, filedata])=>{
      if(!rows[0]){
        console.error('productNotFoundError: redirecting to shop page');
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
          product: rows[0],
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: true 
      });
    })
    .catch(err => {
      console.error('readError-getEditProduct',err);
    });
};


exports.postEditProduct = (req,res,next) => {
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedId = req.body.productId;
  const updatedProduct = new Product(updatedId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  // console.log(updatedProduct);
  updatedProduct.save()
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.error('writeError-postEditProduct',err);
  }); 
};


exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.deleteproductbyID(productId)
    .then(()=>{
      res.redirect('/admin/products');
    })
    .catch(err=>{
      console.error('deleteError-postDeleteProduct',err);
    });
};