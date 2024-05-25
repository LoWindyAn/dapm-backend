const express = require('express');
const router = express.Router();
const { getManufacture, postManufacture, updateManufacture, deleteManufactures, getSearchManufactures } = require('../controllers/CustomerKTKController')

router.get('/', getManufacture);
router.get('/search', getSearchManufactures)
router.post('/', postManufacture)
router.put('/', updateManufacture)
router.delete('/', deleteManufactures)
module.exports = router;