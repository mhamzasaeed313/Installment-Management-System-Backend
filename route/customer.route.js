const express = require('express');
const {createCustomer , updateCustomer , deleteCustomer , getCustomer } = require('../controller/customer.controller')
const customerRoutes = express.Router();

customerRoutes.get('/',getCustomer);
customerRoutes.post('/', createCustomer);
customerRoutes.put('/:id',updateCustomer);
customerRoutes.delete('/:id',deleteCustomer);

module.exports = customerRoutes;