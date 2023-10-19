import mongoose from "mongoose";

module.exports =
  mongoose.models.carts ||
  mongoose.model(
    "carts",
    new mongoose.Schema(
      {
        userId: { type: String },
        products: { type: Array },
        completed: { type: Boolean },
        orderId: { type: String },
      },
      { versionKey: false }
    )
  );
