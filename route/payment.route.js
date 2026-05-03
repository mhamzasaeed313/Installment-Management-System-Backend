const express = require('express');
const {createPayment , getPayment } = require('../controller/Payment.controller')
const paymentRoutes = express.Router();

paymentRoutes.get('/',getPayment);
paymentRoutes.post('/', createPayment);

module.exports = paymentRoutes;