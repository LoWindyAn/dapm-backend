const express = require('express');
const router = express.Router();
const { getProducts, getCategories, postProduct, deleteProducts, getSearchProducts } = require('../controllers/handleProductsController')

router.get('/', getProducts);
router.get('/search', getSearchProducts)

router.get('/categories', getCategories)

router.post('/', postProduct)
router.delete('/', deleteProducts)

module.exports = router;