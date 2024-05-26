const express = require('express');
const router = express.Router();
const { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon } = require('../../controllers/Bill/BillInstallController')

router.get('/', getHoaDon)
router.get('/search', getSearchHoaDon)
router.get('/dslinhkien', getDSLinhkienSuaChua)
router.post('/', postHoadon)
router.put('/', updateHoadon)
router.delete('/', deleteHoadon)
module.exports = router;