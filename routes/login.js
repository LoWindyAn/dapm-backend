const express = require('express');
const router = express.Router();
const { getAllUser, insertUser } = require('../controllers/getUserController')

router.get('/', getAllUser);

router.get('/insert', insertUser);
module.exports = router;