const express = require("express");
const router = express.Router();
const config = require('config')

// Load User model
const auth = require("../config/auth");
const Notification = require("../models/Notification");
const Friends = require("../models/Friends");
const Profile = require("../models/Profile");
const User = require("../models/User");


router.get("/", auth,async (req, res) => {
  const user =  await User.find({_id:req.user.id})
  const profileId = user.map(data => data._id)
  const profile = await Profile.find({userId:profileId}) 
  const userId = profile.map(data => data._id)
  const friend = await Friends.find({profileId:userId})
  const Test = friend.map(data => data._id)
  const notification =  await Notification.find({typeId:Test}).where({view:false  })
    res.send(notification)
});
router.get("/friend", auth,async (req, res) => {
  const user =  await User.find({_id:req.user.id})
  const userId = user.map(data => data._id)
  const profile = await Profile.find({userId:userId}) 
  const profileId= profile.map(data => data._id)
  const friend = await Friends.find({profileId:profileId})
  const Test = friend.map(data => data._id)
  const notification =  await Notification.find({typeId:Test}).where({view:false  })
  const Test2 = notification.map(data => data.typeId)
  const requsetNotification =  await Friends.find({_id:Test2})
  const Test3 = requsetNotification.map(data => data.userId)
  const profile2 = await Profile.find({userId:Test3}) 


    res.send(profile2)
});

module.exports = router;
