const express = require('express');
const router = express.Router();
const { getProducts, getCategories, postProduct, deleteProducts, getSearchProducts, updateProduct } = require('../controllers/ProductsController')

router.get('/', getProducts);
router.get('/search', getSearchProducts)

router.get('/categories', getCategories)

router.post('/', postProduct)
router.delete('/', deleteProducts)
router.put('/', updateProduct)

module.exports = router;