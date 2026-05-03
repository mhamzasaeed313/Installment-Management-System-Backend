const Payment = require('../models/payment.model');
const Installment = require('../models/installment.model');

exports.createPayment = async (req, res) => {
  try {
    const {
      customerId,
      productId,
      installmentId,
      amount_paid
    } = req.body;

    if (!customerId || !productId || !installmentId) {
      return res.status(400).json({
        message: "customerId, productId and installmentId are required"
      });
    }

    if (!amount_paid || amount_paid <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount"
      });
    }

    const installment = await Installment.findById(installmentId);

    if (!installment) {
      return res.status(404).json({
        message: "Installment not found"
      });
    }

    if (amount_paid > installment.remaining_installment) {
      return res.status(400).json({
        message: "Payment exceeds remaining installment"
      });
    }

    const payment = new Payment({
      customerId,
      productId,
      installmentId,
      amount_paid
    });

    await payment.save();

    installment.received_installment += amount_paid;

    installment.remaining_installment = Math.max(
      0,
      installment.total_installment - installment.received_installment
    );

    await installment.save();

    res.status(201).json({
      message: "Payment successful",
      payment,
      installment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('customerId')
      .populate('productId')
      .populate('installmentId')
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};