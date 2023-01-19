const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,

  },
  name:{
    type: String,

  },
  email: {
    type: String,

  },
  password: {
    type: String,

  },
  image: {
    type: String,
    default:"https://www.w3schools.com/w3images/team2.jpg"
  },
  account_status: {
    type: Boolean,

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

const User = mongoose.model('User', UserSchema);

module.exports = User;