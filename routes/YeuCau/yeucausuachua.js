const express = require('express');
const router = express.Router();
const { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon, getNVPhuTrach, tiepnhan, tuchoi } = require('../../controllers/YeuCau/SuaChuaController')

router.get('/', getHoaDon)
router.get('/search', getSearchHoaDon)
router.get('/dslinhkien', getDSLinhkienSuaChua)
router.get('/dsnhanvien', getNVPhuTrach)
router.post('/', postHoadon)
router.put('/', updateHoadon)
router.delete('/', deleteHoadon)
router.put('/tiepnhan', tiepnhan)
router.put('/tuchoi', tuchoi)
module.exports = router;