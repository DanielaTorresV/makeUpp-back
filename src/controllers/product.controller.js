const Product = require("../models/product.model");
const User = require("../models/user.model");
const Manager = require("../models/manager.model");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const products = await Product.find({ user: userId }).populate(
        "user",
        "email"
      );
      res.status(200).json({ message: "Products found", data: products });
    } catch (err) {
      res.status(404).json({ message: "Products not found" });
    }
  },

  async show(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId).populate(
        "user",
        "email"
      );
      res.status(200).json({ message: "Product found", data: product });
    } catch (err) {
      res.status(404).json({ message: "Product not found" });
    }
  },

  async create(req, res) {
    try {
      const managerId = req.manager;
      const product = await Product.create({ ...req.body, manager: managerId });
      const manager = await Manager.findById(managerId);
      manager.products.push(product);
      manager.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Product created", data: product });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Product could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Product updated", data: product });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Product could not be updated", data: err });
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
