const { con } = require('../config/connectDB');


con.connect(function (err) {
    if (err) throw err;
});

const login = (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400);
    }
    console.log(req.body);

    const sql = 'select * from TaiKhoan where TenDangNhap = ? and MatKhau = ?';
    con.query(sql, [username, password], (err, result) => {
        if (err) return res.json(err);
        if (result) return res.json(result)
        else return res.sendStatus(201)
    })
}

module.exports = { login }