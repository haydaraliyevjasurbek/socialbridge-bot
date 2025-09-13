import Chat from "../models/chat.js";

export const saveChat = async (chat) => {
  try {
    await Chat.updateOne(
      { chatId: chat.id },
      {
        chatId: chat.id,
        type: chat.type,
        title: chat.title || ""
      },
      { upsert: true }
    );
    console.log("Chat saqlandi:", chat.id);
  } catch (err) {
    console.error("Chat saqlash xatolik:", err);
  }
};
