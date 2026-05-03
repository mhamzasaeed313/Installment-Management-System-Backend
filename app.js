const express = require('express')
const cors = require('cors')
const app = express()
const authRoutes = require("./route/auth.route");
const customerRoutes = require("./route/customer.route");
const productRoutes = require("./route/product.route");
const installmentRoutes = require("./route/installment.route");
const paymentRoutes = require("./route/payment.route");
const { verifyToken } = require("./middleware/auth");

app.use(express.json())
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api/customer", verifyToken, customerRoutes);
app.use("/api/product", verifyToken, productRoutes);
app.use("/api/installment", verifyToken, installmentRoutes);
app.use("/api/payment", verifyToken, paymentRoutes);


module.exports = app;
