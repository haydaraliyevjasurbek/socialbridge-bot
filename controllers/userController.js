import User from '../models/user.js';
import 'dotenv/config';

export const saveUser = async (msg) => {
  const chatId = msg.chat.id;

  try {
    await User.updateOne(
      { chatId },
      {
        chatId,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name || "",
        username: msg.from.username || ""
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("DB saqlash xatolik:", err);
  }
};

export const getAllUsers = async () => {
  return await User.find({});
};
