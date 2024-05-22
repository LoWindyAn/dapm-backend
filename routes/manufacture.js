const express = require('express');
const router = express.Router();
const { getManufacture } = require('../controllers/ManufactureController')

router.get('/', getManufacture);

module.exports = router;