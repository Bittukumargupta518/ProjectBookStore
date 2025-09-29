const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;

const mobileSchema = new Schema({
  mobileName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  os: { type: String, required: true }, // Operating System
  ram: { type: Number, required: true }, // e.g., 8 GB
  storage: { type: Number, required: true }, // e.g., 128 GB
  battery: { type: Number, required: true }, // mAh
  price: { type: Number, required: true },
  color: { type: String, required: true },
  warranty: { type: String, default: "1 Year" },
  is5G: { type: Boolean, default: false, enum: [true, false] },
  releaseYear: { type: Number, required: true },
  weight: { type: Number, required: true },
  camera: { type: String, required: true },      // e.g., "108MP + 12MP Dual"
  processor: { type: String, required: true },   // e.g., "Snapdragon 8 Gen 3"
  image: { type: String, required: true },       // image filename or URL

  status: { type: String, default: "Active", enum: ["Active", "Disabled"] },
  createdAt: Date,
  updatedAt: Date,
});

// Add timestamps plugin
mobileSchema.plugin(timestamps, { index: true });

module.exports = mongoose.model("Mobile", mobileSchema);
