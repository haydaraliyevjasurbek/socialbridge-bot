import { getAllUsers } from '../controllers/userController.js';
import dotenv from 'dotenv';
dotenv.config();

export const adminCommand = (bot) => {
  const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);

  bot.onText(/\/admin/, async (msg) => {
    if (msg.chat.id !== ADMIN_CHAT_ID) return;

    try {
      const users = await getAllUsers();

      if (users.length === 0) {
        bot.sendMessage(ADMIN_CHAT_ID, "Hali foydalanuvchi yo‘q.");
        return;
      }

      // Inline keyboard yaratish
      const keyboard = users.map((u, index) => {
        const username = u.username ? u.username : "";
        const text = `${u.firstName} ${u.lastName || ""} (ID: ${u.chatId})`;
        const url = username ? `https://t.me/${username}` : null;

        return [{ text, url }]; // Har bir foydalanuvchi alohida tugma
      });

      bot.sendMessage(ADMIN_CHAT_ID, `👥 Foydalanuvchilar soni: ${users.length}`, {
        reply_markup: {
          inline_keyboard: keyboard
        }
      });
    } catch (err) {
      console.error(err);
      bot.sendMessage(ADMIN_CHAT_ID, "❌ Foydalanuvchilar ro'yxatini olishda xatolik yuz berdi.");
    }
  });
};
