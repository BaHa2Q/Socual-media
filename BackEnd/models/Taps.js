const mongoose = require("mongoose");

const TapsSchema = new mongoose.Schema({
  DeleteAt: {
    type: Date,
    default: null,
  },
  UpdateAt: {
    type: Date,
    default: null
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Taps = mongoose.model("taps", TapsSchema);

module.exports = Taps;
