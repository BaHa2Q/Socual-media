const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const Profile = require("../models/Profile");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../config/auth");
router.get("/", (req, res) => {
  User.find().then((data) => res.send(data));
});
router.get("/account", (req, res) => {
  User.findById(req.user.id).then((data) => res.send(data));
});
// Register
router.post("/register", (req, res) => {
  const { username, name, email, password, password2, image, account_status } = req.body;
  const {
    background, website,
    facebook,
    instagram,
    twitter, age,
    mobile,
    phone,
    six,
    Personalemail,
    streetaddress,
    country,
    city,
    postalcode, } = req.body;
  if (!email || !password) {
    return res.send({ msg: "الرجاء إدخال كافة الحقول" });
  }

  if (password.length < 6) {
    return res.send({ msg: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" });
  }
  if (password != password2) {
    return res.send({ msg: "كلمة المرور غير مطابقة" });
  }

  let user = User.findOne({ email: email }).then((data) => {
    if (data) {
      res.send({ msg: "البريد الالكتروني موجود بالفعل" });
    } else {
      user = new User({
        username,
        email,
        name,
        password,
        password2,
        image,
        account_status,
      });
      const profile = new Profile({
        userId: user._id,
        image,
        username,
        background,
        website,
        facebook,
        instagram,
        twitter,
        name:user.name,
        age,
        mobile,
        phone,
        six,
        Personalemail,
        streetaddress,
        country,
        city,
        postalcode,
      });


      let payload = {
        user: {
          _id: user._id,
          username: user.username,
        },
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
          profile
            .save()
            .then((user) => {
              res.send({ msg: "أنت الآن مسجل ويمكنك تسجيل الدخول", ok: true });
            })
            .catch((err) => console.log(err));
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        });
      });
    }
  });
});

router.get("/viewUser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error ");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        msg: `ادخل ${!email ? "البريد الاكتروني" : "كلمة المرور"}!`,
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        return res.send({ msg: "تم تسجيل الدخول", ok: true, user });
      } else {
        return res.send({ msg: "كلمة السر خطأ" });
      }
    } else {
      return res.send({ msg: "الحساب غير موجود" });
    }
  } catch (e) {
    // console.log(e); // Uncomment if needed for debug
    return res.send({ msg: "Something broke!" });
  }
});

module.exports = router;
