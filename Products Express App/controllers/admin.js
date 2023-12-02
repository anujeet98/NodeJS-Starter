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
  // Product.create({
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price
  }).then((result)=>{
    // console.log(result);
    res.redirect('/'); 
  })
  .catch(err=>{
    console.error('writeError-postAddProduct',err);
  });
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then(products=>{
      // console.log(products);
      res.render('admin/products', {
        prods: products,
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
    // Product.findByPk(productId)
    req.user.getProducts()
    .then(products=>{
      const product = products[0];
      if(!product){
        console.error('productNotFoundError: redirecting to shop page');
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
          product: product,
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
  Product.findByPk(updatedId)
    .then(product=>{
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      product.price = updatedPrice;
      return product.save();
    })
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.error('writeError-postEditProduct',err);
  }); 
};


exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
      .then(product => {
        return product.destroy();
      })
      .then(()=>{
        res.redirect('/admin/products');
      })
      .catch(err=>{
        console.error('deleteError-postDeleteProduct',err);
      });
};