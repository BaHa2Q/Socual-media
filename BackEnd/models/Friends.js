const mongoose = require("mongoose");
const Schema = mongoose.Schema
const FriendsSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  profileId:{
    type: Schema.Types.ObjectId,
  },
  request:{
    type:Boolean,
    default:false
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = Friends;
