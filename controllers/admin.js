const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;
  Product.fetchAll(data => {
    const allProducts = data;
    const editedProduct = allProducts.filter(product => product.id === productId);
    // console.log('editedProduct..... ', editedProduct)
    console.log('editMode..... ', editMode);

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editedProduct: editedProduct
    });
  });
};

/* 1st approach to update edited product */
/* 
exports.postEditProduct = (req, res, next) => {
  // console.log('editedProduct_requestBody..... ', req.body);
  const productId = req.params.productId;

  Product.fetchAll(data => {
    const allProducts = data;
    const editedProductIndex = allProducts.findIndex(product => product.id === productId);
    // console.log('editedProductIndex..... ', editedProductIndex);

    const updatedProducts = [...allProducts];
    // console.log('(BFR)editedProducts..... ', updatedProducts);

    updatedProducts[editedProductIndex] = req.body;
    // console.log('(AFT)editedProducts..... ', updatedProducts);
  });

};
 */

/* 2nd approach to update edited product */
exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
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
