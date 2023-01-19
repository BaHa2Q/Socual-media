const express = require("express");
const router = express.Router();
const config = require("config");

// Load User model
const Posts = require("../models/Posts");
const Stars = require("../models/Stars");
const User = require("../models/User");
const auth = require("../config/auth");

router.get("/", auth, (req, res) => {
  Posts.find()
    .where({ DeleteAt: null })
    .then((data) => res.send(data));
});
router.get("/edit/:id", auth, (req, res) => {
  Posts.findById(req.params.id).then((data) => res.send(data));
});
router.put("/edit/:id", auth, (req, res) => {
  const { text } = req.body;
  const thing = {
    text,
    status:true,
    UpdateAt: Date.now(),
  };

  Posts.findByIdAndUpdate({ _id: req.params.id }, thing)
    .then((data) => res.send(data))
    .catch((data) => res.send(data.message));
});
router.get("/liked", auth, async (req, res) => {
  const post = (await Posts.find()).filter(
    (data) =>
      data.star.filter((star) => star.user.toString() === req.user.id).length >0
  );

  res.send(post);
});

router.post("/create", auth, async (req, res) => {
  const { text, status } = req.body;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPosts = new Posts({
      text,
      image: req.body.image,
      userId: req.user.id,
      status,
    });
    const post = await newPosts.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/delete/:id", auth, (req, res) => {
  Posts.findById(req.params.id).then((data) => {
    try {
      if (!data) {
        res.status(401).json("It is Already Deleted");
      } else {
        Posts.findByIdAndDelete(req.params.id, (error) => {
          if (error) {
            res.status(401).json("Post not found");
          } else {
            res.status(200).json("User deleted successfully!");
          }
        });
      }
    } catch (error) {
      res.send(error);
    }
  });
});
router.get("/star", auth, async (req, res) => {
  const stars = await Stars.find();
  const star = stars.filter((star) => star.userId.toString() === req.user.id);
  res.send(star);
});



router.get("/trash", auth, async (req, res) => {
  const post = (await Posts.find({ userId: req.user.id })).filter(
    (data) => data.status === false
  );

  res.send(post);
});

router.put("/trash/:id", auth, (req, res) => {
  Posts.findByIdAndUpdate({ _id: req.params.id }, { DeleteAt: Date.now() }).then(
    (data) => res.send(data)
  );
  Stars.findOneAndUpdate({ postId: req.params.id }, { DeleteAt: Date.now() }).then(
    (data) => res.send(data)
  );
});
// router.get("/star", auth,async(req, res) => {
//  const stars = await Stars.find()
//  const star = stars.filter(star => star.userId.toString() === req.user.id)
//  res.send(star)
// });
router.post("/star/:id", auth, async (req, res) => {
  const stars = await Stars.find({ postId: req.params.id });
  const star =stars.filter((star) => star.userId.toString() === req.user.id).length > 0;
  const star2 = stars.filter((star) => star.userId.toString() === req.user.id);
  const T = star2.map((data) => data._id);
  const whiteDwarf = async () => {
    Stars.findByIdAndDelete(T).then((data) => res.send(data));
  };
  if (star) {
    return whiteDwarf();
  }

  const newPosts = new Stars({
    userId: req.user.id,
    postId: req.params.id,
  });
  const post = await newPosts.save();
  res.json(post);
});
//   router.put("/star/:id", auth, async (req, res) => {
//     try {
//       const post = await Posts.findById( );
//     const stars = post.star.filter(star => star.user.toString() === req.user.id).length > 0
//     const unstar = post.star.filter(star => star.user.toString() === req.user.id).length === 0
//     const removeIndex = post.star.map(star => star.user.toString()).indexOf(req.user.id)

//     const whiteDwarf = async () => {
//       if (unstar) {
//         return res.status(400).json("Post hat not yet been stard");
//       }
//       post.star.splice(removeIndex, 1)
//       await post.save()
//       res.send(post)
//     }
//     if (stars) {
//       return whiteDwarf()
//     }
//     post.star.unshift({ user: req.user.id})

//     await post.save()
//     res.send(post)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send("Server Error")
//   }
// })

module.exports = router;
