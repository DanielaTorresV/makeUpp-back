const Box = require("../models/box.model");
const Product = require("../models/product.model");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const boxes = await Box.find({ user: userId });
      res.status(200).json({ message: "Boxes found", data: boxes });
    } catch (err) {
      res.status(404).json({ message: "Boxes not found" });
    }
  },

  async show(req, res) {
    try {
      const { boxId } = req.params;
      const box = await Box.findById(boxId).populate("products");
      res.status(200).json({ message: "Box found", data: box });
    } catch (err) {
      res.status(404).json({ message: "Box not found" });
    }
  },

  async create(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      const box = await Box.create({ ...req.body });
      box.products.push(product);
      box.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Box created", data: box });
    } catch (err) {
      res.status(400).json({ message: "Box could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { boxId } = req.params;
      const { idLastProduct } = req.body;
      const product = await Product.findById(idLastProduct);
      if (!product) {
        throw new Error("Product not found");
      }
      const box = await Box.findById(boxId).populate("products");
      box.products.push(product);
      box.save({ validateBeforeSave: false });

      res.status(200).json({ message: "Box updated", data: box });
    } catch (err) {
      res.status(400).json({ message: "Box could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { boxId } = req.params;
      const box = await Box.findByIdAndDelete(boxId);
      res.status(200).json({ message: "Box destroyed", data: box });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Box could not be destroyed", data: err });
    }
  },
};
