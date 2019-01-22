const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  userFirstName: {
    type: String,
    minlength: 2
  }
});

mongoose.model('users', userSchema);
