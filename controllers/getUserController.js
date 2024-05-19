const { con } = require('../config/connectDB');


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected MySQL!!!")
});
const getAllUser = (req, res) => {
    const sql = `SELECT * FROM sanpham`

    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const insertUser = (req, res) => {
    const sql = `INSERT INTO account values('nsang3','123456','sang2@gmail.com')`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

module.exports = { getAllUser, insertUser }