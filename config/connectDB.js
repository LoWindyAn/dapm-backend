const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "suachualapdatlinhkien",
    dateStrings: true
})

module.exports = { con }

