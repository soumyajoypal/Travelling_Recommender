const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      required: true,
    },

    bestTime: {
      type: String,
    },

    popularity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
