import User from "../models/User.js";

export const saveUser = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || "";
    const username = msg.from.username || "";

    const existing = await User.findOne({ chatId });
    if (!existing) {
      const newUser = new User({ chatId, firstName, lastName, username });
      await newUser.save();
    }
  } catch (err) {
    console.error("saveUser xato:", err);
  }
};

export const getAllUsers = async () => {
  return await User.find({});
};
