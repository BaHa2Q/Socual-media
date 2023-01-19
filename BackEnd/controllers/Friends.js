const express = require("express");
const router = express.Router();
const config = require('config')

// Load User model
const auth = require("../config/auth");
const Friends =  require("../models/Friends");
const Profile = require("../models/Profile");
const Notification = require("../models/Notification");

router.get("/", auth,async (req, res) => {

  const friend =  await Friends.find({ userId: req.user.id })
  const Profilefriend = await Profile.find()
  const AddFriend = Profilefriend.filter(data => data.userId.toString() === friend)
    res.send(AddFriend)
});
router.get("/friend", auth,async (req, res) => {
  const friend = await Friends.find();
  const Friend = friend.filter(({userId}) => userId.toString() === req.user.id);
  res.send(Friend);

});

router.get("/wait", auth,async (req, res) => {
  const friend = await Friends.find();
  const Friend = friend.filter(({request}) => request === true);
  res.send(Friend);

});
router.put("/agree/:id", auth, (req, res) => {
  const thing = {
    request:true
    
  };
  Friends.findByIdAndUpdate({ _id: req.params.id }, thing)
    .then((data) => res.send(data))
    .catch((data) => res.send(data.message));
});

router.delete("/reject/:id", auth,async (req, res) => {

 const reject = await Friends.findOneAndDelete({ profileId: req.params.id })
    const friendId = reject._id
    const notification =  await Notification.findOneAndDelete({typeId:friendId})
    res.send(notification)

});

  router.post("/Add/:id", auth, async (req, res) => {
    const {_id} = req.body
    const FindFriend = await Friends.find({profileId:req.params.id});
    const FindFriend2 = await Profile.find({userId:req.user.id})
    const Test1 = FindFriend2.map(data => data.userId)
    const FindFriend3 =  (await Friends.find({profileId:req.params.id})).map(data => data._id);
    const AddFriend = FindFriend.filter(data => data.userId.toString() === req.user.id).length > 0
    if (AddFriend) {
      return (res.status(201).json({message:"يوجد طلب بالفعل"}))
    }
    
      const newFriend = new Friends({
        _id,
        userId:Test1,
        profileId:req.params.id
        
      })
      const Addfriend = await newFriend.save();
      const newNotification = new Notification({
        type:"friend",
        typeId:Addfriend._id
        
      })
      const AddNotification = await newNotification.save();
      res.json(AddNotification);

    
  });
  router.post("/:id", auth, async (req, res) => {
    const FindFriend = await Friends.find({profileId:req.params.id});
     const AddFriend = FindFriend.filter(data => data.userId.toString() === req.user.id).length > 0
     const Delete = FindFriend.filter(data => data.userId.toString() === req.user.id)
     const DeleteFriend = Delete.map(data => data._id)
     const whiteDwarf = async () => {
        Friends.findByIdAndDelete(DeleteFriend).then(data => 
        res.send(data)
        )
    }
    if (AddFriend) {
      return whiteDwarf()
    }
    
      const newFriend = new Friends({
        userId:req.user.id,
        profileId:req.params.id
        
      })
      const friend = await newFriend.save();
      res.json(friend);

    
  });

module.exports = router;
