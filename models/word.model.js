const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
  foreignWord: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  translation: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  dateCreation: {
    type: Date,
    required: true
  },
  score: {
    type: Number,
    required: false,
    default: 0
  },
  mastered: {
    type: Boolean,
    required: false,
    default: false
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

mongoose.model('words', wordSchema);
