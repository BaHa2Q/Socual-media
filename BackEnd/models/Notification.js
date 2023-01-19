const mongoose = require("mongoose");
const Schema = mongoose.Schema
const NotificationSchema = new mongoose.Schema({
  type:{
    type: String,
  },
  typeId: {
    type: Schema.Types.ObjectId,
  },
  view:{
    type:Boolean,
    default:false
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification",NotificationSchema);

module.exports = Notification;
