const express = require('express');
const router = express.Router();
const { getProducts, getCategories, postProduct } = require('../controllers/handleProductsController')

router.get('/', getProducts);

router.get('/categories', getCategories)

router.post('/', postProduct)

module.exports = router;