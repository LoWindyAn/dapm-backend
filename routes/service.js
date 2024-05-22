const express = require('express');
const router = express.Router();
const { getServicesRepair } = require('../controllers/serviceController')

router.get('/', getServicesRepair);


module.exports = router;