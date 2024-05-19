const { con } = require('../config/connectDB');


con.connect(function (err) {
    if (err) throw err;
});
const getProducts = (req, res) => {
    const sql = `SELECT * FROM sanpham`

    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const getCategories = (req, res) => {
    const sql = 'SELECT * FROM LoaiLinhKien'
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const postProduct = (req, res) => {
    const { MaSP, TenSP, MoTa, DonGia, PhiLapDat, SoLuongCon, HinhAnh, MaNCC, MaLoai } = req.body
    if (!MaSP || !TenSP || !MoTa || !DonGia || !PhiLapDat || !SoLuongCon || !HinhAnh || !MaNCC || !MaLoai) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO SanPham (MaSP, TenSP, MoTa, DonGia, PhiLapDat, SoLuongCon, HinhAnh, MaNCC, MaLoai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [MaSP, TenSP, MoTa, DonGia, PhiLapDat, SoLuongCon, HinhAnh, MaNCC, MaLoai], (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

module.exports = { getProducts, getCategories, postProduct }