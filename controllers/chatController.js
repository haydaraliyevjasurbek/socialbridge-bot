import Chat from "../models/Chat.js";

export const saveChat = async (chat) => {
  try {
    const existing = await Chat.findOne({ chatId: chat.id });
    if (!existing) {
      const newChat = new Chat({
        chatId: chat.id,
        type: chat.type,
        title: chat.title || ""
      });
      await newChat.save();
    }
  } catch (err) {
    console.error("saveChat xato:", err);
  }
};

export const getAllChats = async () => {
  return await Chat.find({});
};
