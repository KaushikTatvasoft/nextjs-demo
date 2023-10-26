import mongoose, { Schema } from "mongoose";

module.exports =
  mongoose.models.orders ||
  mongoose.model(
    "orders",
    new mongoose.Schema(
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        products: { type: Array },
        price: { type: Number },
      },
      { versionKey: false }
    )
  );
