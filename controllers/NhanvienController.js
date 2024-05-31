const { con } = require('../config/connectDB');
const moment = require('moment-timezone');

con.connect(function (err) {
    if (err) throw err;
});

const getManufacture = (req, res) => {
    const sql = `SELECT * FROM NhaCungCap`

    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const getSearchManufactures = (req, res) => {
    const { type, search } = req.query
    let sql = `SELECT NhanVien.MaNV,
    NhanVien.HoVaTen,
    NhanVien.Luong,
    NhanVien.SDT,
    TaiKhoan.TenDangNhap,
    TaiKhoan.VaiTro,
    TaiKhoan.MatKhau
    FROM TaiKhoan
    JOIN NhanVien ON TaiKhoan.MaTK = NhanVien.MaNV
    WHERE NhanVien.${type} LIKE '%${search}%'`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const postManufacture = (req, res) => {
    const { MaNV, HoVaTen, Luong, SDT, TenDangNhap, VaiTro, MatKhau } = req.body
    if (!MaNV || !HoVaTen || !MatKhau || !TenDangNhap) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const currentDateGMT7 = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');

    let sql = 'INSERT INTO TaiKhoan (MaTK, TenDangNhap, MatKhau, VaiTro, TrangThaiTK, NgayTao) VALUES (?, ?, ?, ?,0,?)';
    con.query(sql, [MaNV, TenDangNhap, MatKhau, VaiTro, currentDateGMT7], (err, result) => {
        if (err) console.log(err);
        sql = 'INSERT INTO NhanVien (MaNV, HoVaTen, Luong, SDT) VALUES (?, ?, ?,?)'
        con.query(sql, [MaNV, HoVaTen, Luong, SDT], (err, result) => {
            if (err) console.log(err);
            return res.json(result)
        })
    })
}

const updateManufacture = (req, res) => {
    const { MaNV, HoVaTen, Luong, SDT, TenDangNhap, VaiTro, MatKhau } = req.body;
    if (!MaNV || !HoVaTen || !MatKhau || !TenDangNhap) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let sql = `
        UPDATE TaiKhoan
        SET MatKhau = ?, 
        VaiTro = ?
        WHERE MaTK = ?
    `;

    con.query(sql, [MatKhau, VaiTro, MaNV], (err, result) => {

        if (err) console.log(err);
        sql = `UPDATE NhanVien
        Set HoVaTen = ?,
        Luong = ?,
        SDT = ?
        WHERE MaNV = ?`
        con.query(sql, [HoVaTen, Luong, SDT, MaNV], (err, result) => {
            if (err) console.log(err);
            res.json(result)
        })
    });
}

const deleteManufactures = (req, res) => {
    const { productIds } = req.body;
    if (!productIds) {
        return res.status(400).send({ error: 'Invalid product IDs' });
    }
    let sql = `DELETE FROM NhanVien WHERE MaNV = '${productIds}'`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error deleting products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        sql = `DELETE FROM TaiKhoan WHERE MaTK = '${productIds}'`
        con.query(sql, (err, result) => {
            if (err) console.log(err);
            return res.json(result)
        })
    });

}

module.exports = { getManufacture, postManufacture, updateManufacture, deleteManufactures, getSearchManufactures }