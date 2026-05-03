const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_category: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false
},
   
}, {
    timestamps: true
});

module.exports = mongoose.model("Product",productSchema)