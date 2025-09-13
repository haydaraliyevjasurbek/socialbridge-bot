import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatId: { type: Number, required: true, unique: true },
  type: { type: String, required: true }, // group, supergroup, channel, private
  title: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
