/* eslint no-param-reassign: "error" */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
},
{timestamps: true}
);

// Init schema
const User = mongoose.model('User', UserSchema);

// Export User schema
module.exports = mongoose.model('User', UserSchema);

// getUserById fuction
module.exports.getUserById = function getUserById(id, callback){
  User.findById(id, callback)
}

// getUserByUsername fuction
module.exports.getUserByUsername = function getUserByUsername(username, callback){
  const query ={username}
  User.findOne(query, callback)
}

// addUser fuction/hash password
module.exports.addUser = function addUser(newUser, callback){
  bcrypt.hash(newUser.password, 10, (err, hash) =>{
    if(err) throw err;
    newUser.password = hash;
    newUser.save(callback)
  });
}

// compare passwords
module.exports.comparePassword = function comparePassword(candidatepassword, hash, callback){
  bcrypt.compare(candidatepassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch)
  });
}
