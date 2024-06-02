const express = require('express');
const router = express.Router();
const { getDoanhThu, getDoanhThu1, getLinhKienDaBan } = require('../controllers/ReportController')

router.get('/doanhthu', getDoanhThu);
router.get('/doanhthu1', getDoanhThu1);
router.get('/linhkienban', getLinhKienDaBan)

module.exports = router;