const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    username: {
        type: String,
    },
    image: {
        type: String,
        default: "https://www.w3schools.com/w3images/team2.jpg",
    },
    background: {
        type: String,
    },

    website: {
        type: String,
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },

    name: {
        type: String,
    },
    age: {
        type: String,
    },
    mobile: {
        type: String,
    },
    phone: {
        type: String,
    },
    six: {
        type: String,
    },
    Personalemail: {
        type: String,
    },
    streetaddress: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    postalcode: {
        type: String,
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
const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
