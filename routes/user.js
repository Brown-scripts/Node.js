const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const _  = require('lodash');
const {User}= require('../models/user');
const bcrypt = require('bcrypt');
const express  = require('express');
const router  = express.Router();

router.get('/me',auth,async(req,res)=>{
    const user =await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/',async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send('User already Registered');

    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));

});

module.exports = router;