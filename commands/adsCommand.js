import User from "../models/user.js";

export const adsCommand = (bot) => {
  bot.onText(/\/ads (.+)/, async (msg, match) => {
    const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);
    if (msg.chat.id !== ADMIN_CHAT_ID) return; // faqat adminga ruxsat

    const textToSend = match[1]; // /ads xabar matni

    try {
      const users = await User.find({});
      for (const user of users) {
        bot.sendMessage(user.chatId, textToSend).catch(err => console.error(err));
      }

      // Guruh va kanallar DB da saqlangan bo‘lsa
      const chats = []; // DB dan olingan guruh/kanal list
      for (const chat of chats) {
        bot.sendMessage(chat.chatId, textToSend).catch(err => console.error(err));
      }

      bot.sendMessage(msg.chat.id, "✅ Xabar barcha foydalanuvchilarga, guruh va kanallarga yuborildi!");
    } catch (err) {
      console.error("Ads xato:", err);
      bot.sendMessage(msg.chat.id, "⚠️ Xabar yuborishda xatolik yuz berdi!");
    }
  });
};
