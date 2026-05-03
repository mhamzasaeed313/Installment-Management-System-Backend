const mongoose = require("mongoose");

const InstallmentSchema = new mongoose.Schema(
  {
    total_installment: {
      type: Number,
      required: true,
    },
    remaining_installment: {
      type: Number,
      default: 0,
    },
    received_installment: {
      type: Number,
      default: 0,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Installment", InstallmentSchema);
