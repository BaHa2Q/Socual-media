const mongoose = require("mongoose");
const Schema = mongoose.Schema
const StarsSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  postId:{
    type: Schema.Types.ObjectId,
  },
  name:{
    type:String,
  },
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

const Stars = mongoose.model("Stars", StarsSchema);

module.exports = Stars;
