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

const getSearchManufactures = (req, res) => {
    const { type, search } = req.query
    let sql = `SELECT * FROM NhaCungCap WHERE ${type} LIKE '%${search}%'`
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result)
    })
}

const postManufacture = (req, res) => {
    const { MaNCC, TenNCC, SDT, DiaChi } = req.body
    if (!MaNCC || !TenNCC || !SDT || !DiaChi) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO NhaCungCap (MaNCC, TenNCC, SDT, DiaChi) VALUES (?, ?, ?, ?)';
    con.query(sql, [MaNCC, TenNCC, SDT, DiaChi], (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
}

const updateManufacture = (req, res) => {
    const { MaNCC, TenNCC, SDT, DiaChi } = req.body;
    if (!MaNCC || !TenNCC || !SDT || !DiaChi) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `
        UPDATE NhaCungCap
        SET TenNCC = ?, 
        SDT = ?, 
        DiaChi = ?
        WHERE MaNCC = ?
    `;

    con.query(sql, [TenNCC, SDT, DiaChi, MaNCC], (err, result) => {
        console.log(err);
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json({ message: 'Product updated successfully', result });
    });
}

const deleteManufactures = (req, res) => {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).send({ error: 'Invalid product IDs' });
    }

    const placeholders = productIds.map(() => '?').join(',');
    const sql = `DELETE FROM NhaCungCap WHERE MaNCC IN (${placeholders})`;
    con.query(sql, productIds, (err, result) => {
        if (err) {
            console.error('Error deleting products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Products deleted successfully' });
    });

}

module.exports = { getManufacture, postManufacture, updateManufacture, deleteManufactures, getSearchManufactures }