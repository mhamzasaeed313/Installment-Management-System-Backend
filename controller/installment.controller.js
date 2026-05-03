const Installment = require('../models/installment.model');

exports.createInstallment = async (req, res) => {
  try {
    const {
      total_installment,
      received_installment = 0,
      productId
    } = req.body;

    if (!total_installment || !productId) {
      return res.status(400).json({
        message: "total_installment and productId are required"
      });
    }

    const remaining_installment =
      total_installment - received_installment;

    const installment = new Installment({
      total_installment,
      received_installment,
      remaining_installment,
      productId
    });

    const savedInstallment = await installment.save();
    res.status(201).json(savedInstallment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateInstallment = async (req, res) => {
  try {
    const installment = await Installment.findById(req.params.id);

    if (!installment) {
      return res.status(404).json({ message: "Installment not found" });
    }

    const allowedFields = [
      'total_installment',
      'received_installment',
      'productId'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        installment[field] = req.body[field];
      }
    });

    installment.remaining_installment =
      installment.total_installment - installment.received_installment;

    const updatedInstallment = await installment.save();
    res.json(updatedInstallment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteInstallment = async (req, res) => {
  try {
    const deletedInstallment = await Installment.findByIdAndDelete(
      req.params.id,
      
    );

    if (!deletedInstallment) {
      return res.status(404).json({ message: "Installment not found" });
    }

    res.json({
      message: "Installment deleted successfully",
      deletedInstallment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getInstallment = async (req, res) => {
  try {
    const installments = await Installment.find({ isDeleted: false })
      .populate('productId');

    res.json(installments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};