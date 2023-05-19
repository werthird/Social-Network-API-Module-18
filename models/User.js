const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: '',
    thoughts: '',
    friends: ''
  }
);

const User = model('user', userSchema);

module.exports = User;