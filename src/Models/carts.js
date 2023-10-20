import mongoose from "mongoose";

module.exports =
  mongoose.models.carts ||
  mongoose.model(
    "carts",
    new mongoose.Schema(
      {
        userId: { type: String },
        products: { type: Array },
      },
      { versionKey: false }
    )
  );
