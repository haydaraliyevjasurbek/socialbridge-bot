import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  chatId: { type: Number, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
