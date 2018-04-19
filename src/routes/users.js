// Import modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Bring config file
const config = require('../config/database');

// Bring in User model
const User = require('../models/user');

// Init router
const router = express.Router();

// Registration
router.post('/register', (req, res)=>{
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, (err)=>{
    if(err){
      res.json({success:false, msg:'Failed to register user'});
    }else{
      res.json({success:true, msg:'User registered'});
    }
  })
});

// Authentication process
router.post('/login', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg:'User is not found'});
    }
    User.comparePassword(password, user.password, (error, isMatch)=>{
      if(error) throw error;
      if(isMatch){
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user:{
            id: user._id,
            name: user.name,
            email: user.email
          }
        })
      }
        return res.json({ success: false, msg: 'Wrong password'});
    });
  });
});

module.exports = router;
