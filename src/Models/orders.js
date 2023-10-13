import mongoose from "mongoose";

module.exports =
  mongoose.models.orders ||
  mongoose.model(
    "orders",
    new mongoose.Schema(
      {
        userId: { type: String },
        products: { type: Array },
        price: { type: Number },
      },
      { versionKey: false }
    )
  );
