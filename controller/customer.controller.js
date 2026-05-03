const Customer = require('../models/customer.model');

exports.createCustomer = async (req, res) => {
  try {
    const { customer_name, customer_number, customer_cnic,customer_address , scheduledDate } = req.body;

    const newcustomer = new Customer({
      customer_name, 
      customer_number, 
      customer_cnic,
      customer_address , 
      scheduledDate: scheduledDate || new Date(),
    });

    const savedcustomer = await newcustomer.save();
    res.json(savedcustomer);

  } catch (error) {
    res.status(500).json({ message: 'Error saving customer', error: error.message });
  }
};
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    const allowedFields = [
      'customer_name',
      'customer_number',
      'customer_cnic',
      'customer_address',
      'scheduledDate'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        customer[field] = req.body[field];
      }
    });

    const updatedcustomer = await customer.save();
    res.json(updatedcustomer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCustomer = async (req, res) => {
  try {
    const deletedcustomer = await Customer.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedcustomer) {
      return res.status(404).json({ message: "customer not found" });
    }

    res.json({ message: "Customer is deleted who name is ", deletedcustomer });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find({ isDeleted: false });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

