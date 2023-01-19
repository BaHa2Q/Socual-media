const express = require('express');
const router = express.Router();

// Load User model
const Restaurants = require('../models/Rastaurants');

router.get('/', async (req, res) => {
  const restaurants = await Restaurants.find()
  res.send(restaurants)

})
// Register
router.post('/create', (req, res) => {
  const {name,description,category_id,img,evaluation,status,demanding } = req.body;

  // Categories.findOne({type:type}).then(user => {
  //   if (user) {
  //     return res.send({ msg: 'القيمة موجودة بالفعل' });
  //   } else {
    const newRestaurants = new Restaurants({
      name,
      description,
      img,
      category_id,
      evaluation,
      status,
      demanding
  });

  newRestaurants.save()
  res.send(newRestaurants)
  //   }
  // })
});

module.exports = router;