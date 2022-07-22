const PurchaseDetail = require("../models/purchaseDetail.model");
const User = require("../models/user.model");
const Box = require("../models/box.model");
const { transporter, confirmationPurchase } = require("../utils/mailer");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const purchases = await PurchaseDetail.find({ user: userId });
      res.status(200).json({ message: "Purchases found", data: purchases });
    } catch (err) {
      res.status(404).json({ message: "Purchases not found" });
    }
  },

  async show(req, res) {
    try {
      const { purchaseId } = req.params;
      const purchase = await Box.findById(purchaseId)
        .populate("user")
        .populate({ path: "box", populate: { path: "products" } });
      res.status(200).json({ message: "Purchase found", data: purchase });
    } catch (err) {
      res.status(404).json({ message: "Purchase not found" });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const { boxId } = req.params;
      const box = await Box.findById(boxId);
      if (!box) {
        throw new Error("Box not found");
      }
      const purchase = await PurchaseDetail.create({
        ...req.body,
      });

      user.purchaseDetails.push(purchase);
      user.save({ validateBeforeSave: false });

      purchase.user.push(user);
      purchase.box.push(box);
      purchase.save({ validateBeforeSave: false });

      res.status(201).json({ message: "Purchase created", data: purchase });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Purchase could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { purchaseId } = req.params;
      const purchase = await PurchaseDetail.findByIdAndUpdate(
        purchaseId,
        req.body,
        {
          new: true,
        }
      )
        .populate("user")
        .populate({ path: "box", populate: { path: "products" } });
      res.status(200).json({ message: "Purchase updated", data: purchase });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Purchase could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { purchaseId } = req.params;
      const purchase = await PurchaseDetail.findByIdAndDelete(purchaseId);
      res.status(200).json({ message: "Purchase destroyed", data: purchase });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Purchase could not be destroyed", data: err });
    }
  },
};
