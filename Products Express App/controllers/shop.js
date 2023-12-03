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
  req.user.getCart()
    .then(cart => {
        return cart.getProducts()
          .then(products => {
            res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products: products
            });
          })
          .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
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
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity =1;
    req.user
      .getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: productId}});
      })
      .then(products => {
        let product;
        if(products.length>0){
          product = products[0];
        }
        if(product){
          let oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity+1;
          return product;
        }
        return Product.findByPk(productId)
      })
      .then(product => {
        return fetchedCart.addProduct(product, { through: {quantity:newQuantity}});
      })
      .then(() => {
          res.redirect('/cart');
      })
      .catch(err=>console.error(err))
};



exports.postCartDeleteProduct = (req,res,next) =>{
   const productId = req.body.productId;
   let fetchedCart;

   req.user.getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where:{id:productId}});
      })
      .then(products => {
        const product=products[0];
        console.log(product);
        return product.cartItem.destroy();
      })
      .then(()=>{
        res.redirect('/cart');
      })
      .catch(err => {
        console.error(err);
      })
}