const { con } = require('../../config/connectDB');
const moment = require('moment-timezone');

con.connect(function (err) {
    if (err) throw err;
});

const getHoaDon = (req, res) => {
    const sql = `SELECT 
    HoaDon.MaHD,
    HoaDon.MaKH,
    HoaDon.LoaiHoaDon,
    HoaDon.NgayTao,
    HoaDon.TongTien,
    HoaDon.TrangThaiHD,
    HoaDon.LoaiKH,
    ChiTietSuaChua.MoTaSuaChua,
    ChiTietSuaChua.ThietBiSua,
    ChiTietSuaChua.TienDoHD,
    ChiTietSuaChua.MaSuaChua,
    ChiTietSuaChua.TinhTrang,
     KhachHangKTK.TenKH,
    KhachHangKTK.NgaySinh,
    KhachHangKTK.GioiTinh,
    KhachHangKTK.SDT,
    KhachHangKTK.Email,
    KhachHangKTK.DiaChi
FROM HoaDon
	JOIN ChiTietSuaChua ON HoaDon.MaHD = ChiTietSuaChua.MaHD
    JOIN KhachHangKTK ON HoaDon.MaKH = KhachHangKTK.MaKH
		WHERE HoaDon.LoaiHoaDon = 'sua chua'`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}
const getSearchHoaDon = (req, res) => {
    const { type, search } = req.query
    let sql = `SELECT 
    HoaDon.MaHD,
    HoaDon.MaKH,
    HoaDon.LoaiHoaDon,
    HoaDon.NgayTao,
    HoaDon.TongTien,
    HoaDon.TrangThaiHD,
    HoaDon.LoaiKH,
    ChiTietLapDat.ThietBiLap,
    ChiTietLapDat.TienDoHD,
     KhachHangKTK.TenKH,
    KhachHangKTK.NgaySinh,
    KhachHangKTK.GioiTinh,
    KhachHangKTK.SDT,
    KhachHangKTK.Email,
    KhachHangKTK.DiaChi
FROM HoaDon
	JOIN ChiTietLapDat ON HoaDon.MaHD = ChiTietLapDat.MaHD
    JOIN KhachHangKTK ON HoaDon.MaKH = KhachHangKTK.MaKH
		WHERE HoaDon.LoaiHoaDon = 'lap dat' `
    if (type == 'SDT') {
        sql = sql + `AND KhachHangKTK.SDT LIKE '%${search}%'`
    } else if (type == 'TenKH') {
        sql = sql + `AND KhachHangKTK.TenKH LIKE '%${search}%'`
    } else if (type == 'MaHD') {
        sql = sql + `AND HoaDon.MaHD LIKE '%${search}%'`

    }
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const getDSLinhkienSuaChua = (req, res) => {
    const { MaHD } = req.query
    let sql = `select MaSP,SoLuong from DSLinhKien where MaHD like'${MaHD}'`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const postHoadon = (req, res) => {
    const { MaHD, MaKH, ThietBiLap } = req.body
    if (!MaHD || !MaKH || !ThietBiLap) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    console.log(req.body);

    const currentDateGMT7 = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');  // Format to 'YYYY-MM-DD HH:MM:SS'

    const sql = `INSERT INTO HoaDon (MaHD, MaKH, LoaiHoaDon, TrangThaiHD,NgayTao,TongTien,LoaiKH) VALUES (?, ?,'lap dat',0,?, 0, 1)`;
    con.query(sql, [MaHD, MaKH, currentDateGMT7], (err, result) => {
        if (err) console.log(err);

        const sqlChiTietSuaChua = `INSERT INTO ChiTietLapDat (MaHD, ThietBiLap) VALUES (?, ?)`;
        con.query(sqlChiTietSuaChua, [MaHD, ThietBiLap], (err, result) => {
            if (err) console.log(err);
            return res.json(result);
        });
    })
}

const updateHoadon = (req, res) => {
    const { MaHD, TrangThaiHD, TienDoHD } = req.body.hoadon
    const { dslinhkien } = req.body

    let sql = `DELETE FROM DSLinhKien WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `INSERT INTO DSLinhKien (MaHD, MaSP, SoLuong) VALUES ?`;
    const values = dslinhkien.map(item => [MaHD, item.MaSP, item.SoLuong]);
    con.query(sql, [values], (err, result) => {
        if (err) console.log(err);

    });

    sql = `UPDATE HoaDon SET TrangThaiHD = ? WHERE MaHD = ?`
    con.query(sql, [TrangThaiHD, MaHD], (err, result) => {
        if (err) return console.log(err);
    });

    sql = `UPDATE ChiTietLapDat SET TienDoHD = ? WHERE MaHD = ?`
    con.query(sql, [TienDoHD, MaHD], (err, result) => {
        if (err) return console.log(err);
    });

    return res.sendStatus(200)
}

const deleteHoadon = (req, res) => {
    const { MaHD } = req.body
    let sql = `DELETE FROM DSLinhKien WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `DELETE FROM ChiTietLapDat  WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `DELETE FROM HoaDon WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    return res.sendStatus(200)
}



module.exports = { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon }