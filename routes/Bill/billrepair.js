const express = require('express');
const router = express.Router();
const { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon, getNVPhuTrach } = require('../../controllers/Bill/BillRepairController')

router.get('/', getHoaDon)
router.get('/search', getSearchHoaDon)
router.get('/dslinhkien', getDSLinhkienSuaChua)
router.get('/dsnhanvien', getNVPhuTrach)
router.post('/', postHoadon)
router.put('/', updateHoadon)
router.delete('/', deleteHoadon)
module.exports = router;