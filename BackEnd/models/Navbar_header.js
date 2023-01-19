const mongoose = require('mongoose');

const Navbar_headerSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  path: {
    type: String,

  },
  action: {
    type: Boolean,

  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Navbar_header = mongoose.model('Navbar_header', Navbar_headerSchema);

module.exports = Navbar_header;