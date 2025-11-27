const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  },

  phone: {
    type: Number,
  },

  email: {
    type: String,
  },

  firstName: {
    type: String,
  },

  middleName: {
    type: String,   // optional
  },

  surname: {
    type: String,
  },


  college: {
    type: String,
  },

  
  otherCollege: {
    type: String,
  },

  profilePhoto: {
    type: String,
    default: "/img/Profile.png"   // Optional default image
  }
});

// FIX OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
