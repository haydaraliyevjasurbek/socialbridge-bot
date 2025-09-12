const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  chatId: { type: Number, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
