const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvent');
const { con } = require('./config/connectDB');



con.connect(function (err) {
    if (err) throw err;
    console.log("Connected MySQL!!!")
});

// const sql = `INSERT INTO account value('nsangg','123456','sang@gmail.com')`
const sql = `SELECT * FROM account`

con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
})



app.use(logger);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))