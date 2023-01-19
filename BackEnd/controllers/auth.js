const express = require('express');
const auth = require('../config/auth');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check')
// Load User model
router.get('/', auth,async (req, res) => {
        const user = await User.find()
        res.json(user);
 

});
router.post('/login', [check('email', "ادخل البريد الاكتروني").isEmail(), check('password', " ادخل كلمة المرور").isLength({ min: 6 })], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
        
        let user = await User.findOne({ email });
    
        if(user) {
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch) {
              let payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    
                }
            }
            jwt.sign(
                payload,
                'secretkey',
                (err, token) => {
                    if (err) throw err
                    res.json({ token,successful:"تم تسجيل الدخول" })
    
                }
            )
            } else {
                res.status(402).json('كلمة السر خطأ');
            }
        } else {
           res.status(402).json('الحساب غير موجود');
        }
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

module.exports = router;