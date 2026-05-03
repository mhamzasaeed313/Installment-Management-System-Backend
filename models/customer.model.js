const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
    },
    customer_number: {
        type: String,
        required: true,
    },
    customer_cnic: {
        type: String,
        required: true,
    },
    customer_address: {
        type: String,
        required: true,
    },
    scheduledDate: {
    type: Date,
    default: () => new Date(), 
  },
  
   
}, {
    timestamps: true
});

module.exports = mongoose.model("Customer",CustomerSchema)