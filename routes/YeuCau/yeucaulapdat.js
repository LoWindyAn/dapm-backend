const express = require('express');
const router = express.Router();
const { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon, tiepnhan, tuchoi } = require('../../controllers/YeuCau/LapDatController')

router.get('/', getHoaDon)
router.get('/search', getSearchHoaDon)
router.get('/dslinhkien', getDSLinhkienSuaChua)
router.post('/', postHoadon)
router.put('/', updateHoadon)
router.put('/tiepnhan', tiepnhan)
router.put('/tuchoi', tuchoi)
router.delete('/', deleteHoadon)
module.exports = router;