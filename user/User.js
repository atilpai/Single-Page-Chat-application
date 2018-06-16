// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  password: String,
  rooms: [{name : String}],
  messages: [{content: String, sender: String, receiver: String}]
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');