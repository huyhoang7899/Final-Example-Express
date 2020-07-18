var { Shop, Product } = require('../models/shop.model');

module.exports.postCreate = async function(req, res, next) {
  var id = req.params.id;
  var products = await Product.find({ shop: id });

  var errors = [];
  if(!req.body.title) {
    errors.push('Title is required !');
  }
  if(!req.body.description) {
    errors.push('Author is required !');
  }

  if(errors.length) {
    res.render('products/create', {
      errors: errors,
      products: products,
      values: req.body
    });
    return;
  }
  next();
}
