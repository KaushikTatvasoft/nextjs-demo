import mongoose from "mongoose";

module.exports =
  mongoose.models.products ||
  mongoose.model(
    "products",
    new mongoose.Schema(
      {
        category: { type: String },
        description: { type: String },
        image: { type: String },
        price: { type: Number },
        salePrice: { type: Number },
        categoryId: { type: String },
        title: { type: String },
      },
      { versionKey: false }
    )
  );
