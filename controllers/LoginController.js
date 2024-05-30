const { con } = require('../config/connectDB');


con.connect(function (err) {
    if (err) throw err;
});

const login = (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra nếu username hoặc password không được cung cấp
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = `SELECT * FROM TaiKhoan 
    JOIN NhanVien ON NhanVien.MaNV = TaiKhoan.MaTK
    WHERE TaiKhoan.TenDangNhap = ? AND TaiKhoan.MatKhau = ?`;
    con.query(sql, [username, password], (err, result) => {
        if (err) {
            // Xử lý lỗi cơ sở dữ liệu
            console.log(err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        console.log(result);

        if (result.length === 0) {
            // Không tìm thấy tài khoản
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result[0];

        // Kiểm tra trạng thái tài khoản
        if (user.TrangThaiTK !== 1) {
            return res.status(403).json({ error: 'Account is disabled' });
        }

        // Trả về thông tin tài khoản nếu hợp lệ
        return res.status(200).json({
            MaTK: user.MaTK,
            VaiTro: user.VaiTro,
            HoVaTen: user.HoVaTen,
            Avatar: user.Avatar
        });
    });
};

module.exports = { login }