const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
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
      validate: validator.isEmail,
    },
    friends: [mongoose.Schema.Types.ObjectId],
  },
  {
    toJSON: { virtuals: true },
    virtuals: {
      friendCount: {
        get() {
          return this.friends.length;
        },
      },
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
