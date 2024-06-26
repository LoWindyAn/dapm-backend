const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvent');
const products = require('./routes/products')
const manufacture = require('./routes/manufacture')
const repair = require('./routes/repair')
const customerktk = require('./routes/customerktk')
const billrepair = require('./routes/Bill/billrepair')
const billinstall = require('./routes/Bill/billinstall')
const login = require('./routes/login')
const report = require('./routes/report')
const nhanvien = require('./routes/nhanvien')
const yeucausuachua = require('./routes/YeuCau/yeucausuachua')
const yeucaulapdat = require('./routes/YeuCau/yeucaulapdat')
app.use(cors());

// Cấu hình middleware để phân tích cú pháp JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

//routes
app.use('/products', products)
app.use('/manufacture', manufacture)
app.use('/repair', repair)
app.use('/customer', customerktk)
app.use('/bill/repair', billrepair)
app.use('/bill/install', billinstall)
app.use('/login', login)
app.use('/report', report)
app.use('/nhanvien', nhanvien)
app.use('/yeucau/suachua', yeucausuachua)
app.use('/yeucau/lapdat', yeucaulapdat)


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))