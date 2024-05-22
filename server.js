const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvent');
const login = require('./routes/login');
const products = require('./routes/products')
const service = require('./routes/service')

app.use(cors());

// Cấu hình middleware để phân tích cú pháp JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

//routes
app.use('/login', login);
app.use('/products', products)
app.use('/service', service)


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))