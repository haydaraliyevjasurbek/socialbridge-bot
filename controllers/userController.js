import User from "../models/user.js";

export const saveUser = async (msg) => {
  try {
    const { id, first_name, last_name, username } = msg.from;
    const existingUser = await User.findOne({ chatId: id });
    if (!existingUser) {
      const newUser = new User({
        chatId: id,
        firstName: first_name,
        lastName: last_name,
        username: username,
        date: new Date()
      });
      await newUser.save();
      console.log(`Yangi foydalanuvchi saqlandi: ${first_name}`);
    }
  } catch (err) {
    console.error("saveUser xato:", err);
  }
};
