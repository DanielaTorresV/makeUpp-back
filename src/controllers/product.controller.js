const Product = require("../models/product.model");

module.exports = {
  async list(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ message: "Products found", data: products });
    } catch (err) {
      res.status(404).json({ message: "Products not found" });
    }
  },

  async show(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      res.status(200).json({ message: "Product found", data: product });
    } catch (err) {
      res.status(404).json({ message: "Product not found" });
    }
  },

  async create(req, res) {
    try {
      const product = await Product.create({ ...req.body });
      res.status(201).json({ message: "Product created", data: product });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Product could not be created", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      res.status(200).json({ message: "Product destroyed", data: product });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Product could not be destroyed", data: err });
    }
  },
};
