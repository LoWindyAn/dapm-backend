const express = require('express');
const router = express.Router();
const { getProducts, getCategories, postProduct, deleteProducts } = require('../controllers/handleProductsController')

router.get('/', getProducts);

router.get('/categories', getCategories)

router.post('/', postProduct)
router.delete('/', deleteProducts)

module.exports = router;