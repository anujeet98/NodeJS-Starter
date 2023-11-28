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
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};


exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
      return res.redirect('/');
    }
    const productId  = req.params.productId;
    Product.findById(productId, (product) => {
        if(!product){
          console.error('productNotFoundError: redirecting to shop page');
          return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true 
        })
    });
    // res.redirect('/');
};


exports.postEditProduct = (req,res,next) => {
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedId = req.body.productId;
  const updatedProduct = new Product(updatedId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  // console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/admin/products');
};


exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.deleteproductbyID(productId);
    res.redirect('/admin/products');
};