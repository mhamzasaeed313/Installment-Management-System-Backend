const express = require('express');
const {createInstallment , updateInstallment , deleteInstallment , getInstallment } = require('../controller/Installment.controller')
const installmentRoutes = express.Router();

installmentRoutes.get('/',getInstallment);
installmentRoutes.post('/', createInstallment);
installmentRoutes.put('/:id',updateInstallment);
installmentRoutes.delete('/:id',deleteInstallment);
module.exports = installmentRoutes;