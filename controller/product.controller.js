const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    const {
      product_category,
      product_name,
      product_description,
      product_price,
      customerId
    } = req.body;

    const product = new Product({
      product_category,
      product_name,
      product_description,
      product_price
    });

    if (customerId) {
      product.customerId = customerId;
    }

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allowedFields = [
      'product_category',
      'product_name',
      'product_price',
      'product_description',
      'customerId'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id,

    );

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      deletedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate('customerId');

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};