const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, filedata])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.error('readError-getProducts-Shop',err);
  });

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, filedata])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.error('readError-getIndex',err);
  });

};

exports.getProductDetails = (req,res,next) => {
    const productId = req.params.productId;
    Product.findById(productId)
      .then(([rows, filedata])=>{
        res.render('shop/product-details', {
          path: '/products',
          product: rows[0],
          pageTitle: 'product Details'
        });
      })
      .catch(err => {
        console.error('readError-getProductDetails',err);
      });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCart = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId, (product)=>{
      Cart.addToCart(prodId, product.price);
  });
   res.redirect('/cart');
};

