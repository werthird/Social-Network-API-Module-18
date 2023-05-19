const { Schema, model } = require('mongoose');


// Build Schema
const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
      validate: {
        validator: function(v) {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},
        message: email => `${email.value} is not a valid email address!`,
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  }
);



// Build Model
const User = model('user', userSchema);


module.exports = User;