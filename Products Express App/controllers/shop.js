const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.error('readError-getProducts-Shop',err);
  });

};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index', {
      prods: products,
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
    //using find all but returns array so take 0th index->
    // Product.findAll({
    //   where:{
    //     id: productId
    //   }
    // })
      //using findByPk (previously findById). returns 1 object and not the array
      Product.findByPk(productId)
      .then(product=>{
        res.render('shop/product-details', {
          path: '/products',
          product: product,
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

