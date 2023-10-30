import mongoose, { Schema } from "mongoose";

module.exports =
  mongoose.models.carts ||
  mongoose.model(
    "carts",
    new mongoose.Schema(
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        products: { type: Array },
        completed: { type: Boolean },
        orderId: { type: String },
        price: { type: Number },
      }
    )
  );
