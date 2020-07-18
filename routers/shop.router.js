var express = require('express');

var controller = require('../controllers/shop.controller');
var authMiddleware = require('../middlewares/auth.middleware');
var validation = require('../validation/shop.validation');
var validationProduct = require('../validation/product.validation');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/create', authMiddleware.requireAuth, controller.create);

router.post('/create', validation.postCreate, authMiddleware.requireAuth, controller.postCreate);

router.get('/:id/books', authMiddleware.requireAuth, controller.products);

router.get('/:id/create', authMiddleware.requireAuth, controller.createProduct);

router.post('/:id/create', validationProduct.postCreate, authMiddleware.requireAuth, controller.postCreateProduct);

router.get('/:id/update', controller.updateProduct);

router.get('/:id/delete', controller.deleteProduct);

router.post('/products/update', controller.postUpdateProduct);

module.exports = router;
