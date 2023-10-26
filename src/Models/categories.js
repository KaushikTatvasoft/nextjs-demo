import mongoose from "mongoose";

module.exports =
  mongoose.models.categories ||
  mongoose.model(
    "categories",
    new mongoose.Schema(
      {
        name: { type: String },
      }
    )
  );
