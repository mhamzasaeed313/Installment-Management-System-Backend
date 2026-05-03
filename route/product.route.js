const express = require('express');
const {createProduct , updateProduct , deleteProduct , getProduct } = require('../controller/product.controller')
const productRoutes = express.Router();

productRoutes.get('/',getProduct);
productRoutes.post('/', createProduct);
productRoutes.put('/:id',updateProduct);
productRoutes.delete('/:id',deleteProduct);

module.exports = productRoutes;