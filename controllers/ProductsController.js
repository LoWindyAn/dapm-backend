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

const getSearchProducts = (req, res) => {
    const { type, search, maloai } = req.query
    let sql = `SELECT * FROM sanpham WHERE ${type} LIKE '%${search}%'`
    if (maloai) {
        sql += `AND MaLoai LIKE '${maloai}'`
    }
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const updateProduct = (req, res) => {
    const { MaSP, TenSP, MoTa, DonGia, PhiLapDat, SoLuongCon, HinhAnh, MaNCC, MaLoai } = req.body;
    if (!MaSP || !TenSP || !MoTa || !DonGia || !PhiLapDat || !SoLuongCon || !HinhAnh || !MaNCC || !MaLoai) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `
        UPDATE SanPham
        SET TenSP = ?, 
            MoTa = ?, 
            DonGia = ?, 
            PhiLapDat = ?, 
            SoLuongCon = ?, 
            HinhAnh = ?, 
            MaNCC = ?, 
            MaLoai = ?
        WHERE MaSP = ?
    `;

    con.query(sql, [TenSP, MoTa, DonGia, PhiLapDat, SoLuongCon, HinhAnh, MaNCC, MaLoai, MaSP], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json({ message: 'Product updated successfully', result });
    });
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
        if (err) return res.json(err);
        return res.json(result)
    })
}

const deleteProducts = (req, res) => {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).send({ error: 'Invalid product IDs' });
    }

    const placeholders = productIds.map(() => '?').join(',');
    const sql = `DELETE FROM SanPham WHERE MaSP IN (${placeholders})`;
    con.query(sql, productIds, (err, result) => {
        if (err) {
            console.error('Error deleting products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Products deleted successfully' });
    });

}

module.exports = { getProducts, getCategories, postProduct, deleteProducts, getSearchProducts, updateProduct }