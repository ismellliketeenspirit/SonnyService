const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'a product name is required!']
  },
  email: {
    type: String,
    required: [true, 'a valid email is required!']
  },
  address: {
    type: Number,
    required: [true, 'an address name is required!']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;