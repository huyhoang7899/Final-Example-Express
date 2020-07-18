var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId }
});

const productSchema = Schema({
  description: String,
  title: String,
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
});

const Shop = mongoose.model('Shop', shopSchema, 'shops');
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = { Shop, Product };

