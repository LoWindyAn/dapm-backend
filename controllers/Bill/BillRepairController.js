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
		WHERE HoaDon.LoaiHoaDon = 'sua chua' AND HoaDon.TrangThaiDuyet = 1`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}
const getSearchHoaDon = (req, res) => {
    const { type, search, TrangThaiHD, TienDoHD, VaiTro, MaNV } = req.query
    let sql = `SELECT 
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
    JOIN KhachHangKTK ON HoaDon.MaKH = KhachHangKTK.MaKH `
    if (VaiTro == 'ktv') {
        sql += `JOIN dsnhanvienphutrach ON HoaDon.MaHD = dsnhanvienphutrach.MaHD `
    }
    sql += `WHERE HoaDon.LoaiHoaDon = 'sua chua' AND HoaDon.TrangThaiDuyet = 1 `

    if (type == 'SDT') {
        sql = sql + `AND KhachHangKTK.SDT LIKE '%${search}%'`
    } else if (type == 'TenKH') {
        sql = sql + `AND KhachHangKTK.TenKH LIKE '%${search}%'`
    } else if (type == 'MaHD') {
        sql = sql + `AND HoaDon.MaHD LIKE '%${search}%'`

    }
    sql += `AND HoaDon.TrangThaiHD LIKE '%${TrangThaiHD}%' AND ChiTietSuaChua.TienDoHD LIKE '%${TienDoHD}%'`

    if (VaiTro == 'ktv') {
        sql += `AND dsnhanvienphutrach.MaNV = '${MaNV}'`
    }


    // sql += `ORDER BY ChiTietSuaChua.TienDoHD ASC, HoaDon.TrangThaiHD ASC`
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

const getNVPhuTrach = (req, res) => {
    const { MaHD } = req.query
    let sql = `select MaHD,MaNV from DSNhanVienPhuTrach where MaHD like'${MaHD}'`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const postHoadon = (req, res) => {
    const { MaHD, MaKH, ThietBiSua, TinhTrang, SDT, TenKH, DiaChi } = req.body
    if (!MaHD || !MaKH || !ThietBiSua || !TinhTrang) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const currentDateGMT7 = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');  // Format to 'YYYY-MM-DD HH:MM:SS'

    let sql = `SELECT * from KhachHangKTK WHERE MaKH = '${MaKH}'`
    con.query(sql, (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            sql = `INSERT INTO HoaDon (MaHD, MaKH, LoaiHoaDon, TrangThaiHD,NgayTao,TongTien,LoaiKH) VALUES (?, ?,'sua chua',0,?, 0, 1)`;
            con.query(sql, [MaHD, MaKH, currentDateGMT7], (err, result) => {
                if (err) console.log(err);

                const sqlChiTietSuaChua = `INSERT INTO ChiTietSuaChua (MaHD, ThietBiSua, TinhTrang) VALUES (?, ?, ?)`;
                con.query(sqlChiTietSuaChua, [MaHD, ThietBiSua, TinhTrang], (err, result) => {
                    if (err) console.log(err);
                    return res.json(result);
                });
            })
        } else {
            sql = `INSERT INTO KhachHangKTK (MaKH,TenKH,SDT,DiaChi) VALUES (?,?,?,?)`
            con.query(sql, [MaKH, TenKH, SDT, DiaChi], (err, result) => {
                if (err) console.log(err);
                sql = `INSERT INTO HoaDon (MaHD, MaKH, LoaiHoaDon, TrangThaiHD,NgayTao,TongTien,LoaiKH) VALUES (?, ?,'sua chua',0,?, 0, 1)`;
                con.query(sql, [MaHD, MaKH, currentDateGMT7], (err, result) => {
                    if (err) console.log(err);

                    const sqlChiTietSuaChua = `INSERT INTO ChiTietSuaChua (MaHD, ThietBiSua, TinhTrang) VALUES (?, ?, ?)`;
                    con.query(sqlChiTietSuaChua, [MaHD, ThietBiSua, TinhTrang], (err, result) => {
                        if (err) console.log(err);
                        return res.json(result);
                    });
                })
            })
        }
    })

    return res.status(200)
}

const updateHoadon = (req, res) => {
    const { MaHD, TrangThaiHD, MoTaSuaChua, TienDoHD, MaSuaChua } = req.body.hoadon
    const { dslinhkien } = req.body
    const { user } = req.body

    let sql = `DELETE FROM DSLinhKien WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `select * from DSNhanVienPhuTrach where MaHD like'${MaHD}' and MaNV like'${user.MaTK}'`
    con.query(sql, (err, result) => {
        if (err) console.log(err);
        if (result.length < 1) {
            sql = `insert into DSNhanVienPhuTrach (MaHD,MaNV) VALUES ('${MaHD}','${user.MaTK}')`
            con.query(sql, (err, result) => {
                if (err) console.log(err);

            })
        }
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

    sql = `UPDATE ChiTietSuaChua SET MoTaSuaChua = ?, TienDoHD = ?, MaSuaChua = ? WHERE MaHD = ?`
    con.query(sql, [MoTaSuaChua, TienDoHD, MaSuaChua, MaHD], (err, result) => {
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

    sql = `DELETE FROM ChiTietSuaChua  WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `DELETE FROM DSNhanVienPhuTrach  WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    sql = `DELETE FROM HoaDon WHERE MaHD = ?`
    con.query(sql, MaHD, (err, result) => {
        if (err) console.log(err);
    });

    return res.sendStatus(200)
}



module.exports = { getHoaDon, getSearchHoaDon, postHoadon, getDSLinhkienSuaChua, updateHoadon, deleteHoadon, getNVPhuTrach }