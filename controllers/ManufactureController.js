const { con } = require('../config/connectDB');


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

module.exports = { getManufacture }