const express = require('express');
const {login,logout, register} = require('../controller/auth.controller')
const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login',login);
authRoutes.post('/logout',logout);

module.exports = authRoutes;