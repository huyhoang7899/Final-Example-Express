var mongoose = require('mongoose');
var { Shop, Product } = require('../models/shop.model');
// var Product = require('../models/shop.model');

module.exports.index = async function(req, res) {
  var userId = req.signedCookies.userId;
  var shops = await Shop.find({ userId: userId });
  res.render('shop/index', {
    shops: shops
  });
}

module.exports.create = function(req, res) {
  res.render('shop/create');
}

module.exports.postCreate = async function(req, res) {
  var userId = req.signedCookies.userId;
  var shop = await Shop.create({userId: userId, name: req.body.name});
  res.redirect('/shops');
}

module.exports.products = async function(req, res) {
  var id = req.params.id;
  var shop = await Shop.findById(id);
  var products = await Product.find({ shop: id});
  var userId = req.signedCookies.userId;
  res.render('products/index', {
    products: products,
    shop: shop,
    id: id,
    userId: userId
  });
}

module.exports.createProduct = async function(req, res) {
  var id = req.params.id;
  var shop = await Shop.findById(id);
  res.render('products/create', {
    shop: shop
  });
}

module.exports.postCreateProduct = async function(req, res) {
  var id = req.params.id;
  var shop = await Shop.findById(id);

  const product = new Product({
      title: req.body.title,
      description: req.body.description,
      shop: shop._id
    });

    product.save(function (err) {
      if (err) return handleError(err);
    });

  res.redirect('/shops/' + id + '/books');
}

module.exports.updateProduct = async function(req, res) {
  var id = req.params.id;
  var product = await Product.findById(id);
  res.render('products/update', {
    product: product
  });
}

module.exports.deleteProduct = async function(req, res) {
  var id = req.params.id;
  await Product.findByIdAndRemove(id);
  res.redirect('back');
}
module.exports.postUpdateProduct = async function(req, res) {
  var id = req.body.id;
  await Product.findByIdAndUpdate(id, { title: req.body.title, description: req.body.description});
  res.redirect('/shops');
}

