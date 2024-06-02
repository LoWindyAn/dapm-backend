const { con } = require('../config/connectDB');


con.connect(function (err) {
    if (err) throw err;
});

const getDoanhThu = (req, res) => {
    const sql = `SELECT YEAR(NgayTao) AS Nam, MONTH(NgayTao) AS Thang, SUM(TongTien) AS DoanhThu FROM HoaDon GROUP BY YEAR(NgayTao), MONTH(NgayTao) ORDER BY Nam, Thang`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const getDoanhThu1 = (req, res) => {
    let sql = `SELECT YEAR(hd.NgayTao) AS Nam, MONTH(hd.NgayTao) AS Thang, SUM(hd.TongTien) AS DoanhThu 
    FROM HoaDon hd
    WHERE hd.LoaiHoaDon IN ('lap dat') AND hd.TrangThaiDuyet = 1 AND hd.TrangThaiHD = 1 
    GROUP BY YEAR(hd.NgayTao), MONTH(hd.NgayTao), hd.LoaiHoaDon
    ORDER BY Nam, Thang, hd.LoaiHoaDon`
    let a = {
        lapdat: [],
        suachua: [],
        tongthu: []
    }
    con.query(sql, (err, result) => {
        if (err) throw err;
        a = { ...a, lapdat: result }
    })

    sql = `SELECT YEAR(hd.NgayTao) AS Nam, MONTH(hd.NgayTao) AS Thang, SUM(hd.TongTien) AS DoanhThu 
    FROM HoaDon hd
    WHERE hd.LoaiHoaDon IN ('sua chua') AND hd.TrangThaiDuyet = 1 AND hd.TrangThaiHD = 1 
    GROUP BY YEAR(hd.NgayTao), MONTH(hd.NgayTao), hd.LoaiHoaDon
    ORDER BY Nam, Thang, hd.LoaiHoaDon`

    con.query(sql, (err, result) => {
        if (err) throw err;
        a = { ...a, suachua: result }
    })

    sql = `SELECT YEAR(NgayTao) AS Nam, MONTH(NgayTao) AS Thang, SUM(TongTien) AS DoanhThu 
    FROM HoaDon 
    WHERE TrangThaiDuyet = 1 AND TrangThaiHD = 1
    GROUP BY YEAR(NgayTao), MONTH(NgayTao) ORDER BY Nam, Thang`

    con.query(sql, (err, result) => {
        if (err) throw err;
        a = { ...a, tongthu: result }
        return res.json(a)
    })


}

const getLinhKienDaBan = (req, res) => {
    let sql = `SELECT 
    lk.TenLoai,
    YEAR(h.NgayTao) AS Nam,
    MONTH(h.NgayTao) AS Thang,
    SUM(d.SoLuong) AS SoLuongBanRa
FROM 
    DSLinhKien d
JOIN 
    SanPham s ON d.MaSP = s.MaSP
JOIN 
    LoaiLinhKien lk ON s.MaLoai = lk.MaLoai
JOIN 
    HoaDon h ON d.MaHD = h.MaHD
WHERE 
    h.TrangThaiDuyet = 1 AND 
    h.TrangThaiHD = 1
GROUP BY 
    lk.TenLoai, 
    YEAR(h.NgayTao),
    MONTH(h.NgayTao)
ORDER BY 
    lk.TenLoai, 
    Nam, 
    Thang;`

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    })

}

module.exports = { getDoanhThu, getDoanhThu1, getLinhKienDaBan }