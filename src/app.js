const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', productosRoutes);

module.exports = app;