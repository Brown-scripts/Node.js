const _  = require('lodash');
const {User}= require('../models/user');
const bcrypt = require('bcrypt');
const express  = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    const user = await User.find().sort('name');
    res.send(user);
});

router.post('/',async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')
    
    const token = user.generateAuthToken();
    res.send(token);
});





module.exports = router;