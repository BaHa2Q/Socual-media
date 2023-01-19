const express = require("express");
const router = express.Router();
const config = require('config')

// Load User model
const Posts = require("../models/Posts");
const User = require("../models/User");
const auth = require("../config/auth");
const Profile = require("../models/Profile");


router.get("/",auth, (req, res) => {
    Profile.find().then((data) => res.send(data));
  });
  router.get("/account",auth, (req, res) => {
    Profile.findOne({ userId: req.user.id }).then((data) => res.send(data));
  });
router.put("/:id", auth, async (req, res) => {
    Profile.findByIdAndUpdate({_id:req.params.id},req.body).then(data => res.send(data))
    
  })
  
module.exports = router;
