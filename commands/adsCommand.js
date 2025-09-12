import 'dotenv/config';
import { getAllUsers } from '../controllers/userController.js';

const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);

export const adsCommand = (bot) => {
  bot.onText(/\/ads/, async (msg) => {
    const chatId = msg.chat.id;

    // Admin bo'lmasa chiqish
    if (chatId !== ADMIN_CHAT_ID) return;

    bot.sendMessage(chatId, "📷 Rasmli reklama postini yuboring:");

    // Bir marta rasm yoki matnni qabul qilish
    bot.once('message', async (postMsg) => {
      try {
        // Agar rasm bo'lsa
        if (postMsg.photo) {
          const fileId = postMsg.photo[postMsg.photo.length - 1].file_id;
          const caption = postMsg.caption || "";

          const users = await getAllUsers();
          users.forEach(user => {
            bot.sendPhoto(user.chatId, fileId, { caption });
          });

          bot.sendMessage(chatId, `✅ Rasmli post ${users.length} userga yuborildi.`);
        }
        // Agar faqat matn bo'lsa
        else if (postMsg.text) {
          const text = postMsg.text;

          const users = await getAllUsers();
          users.forEach(user => {
            bot.sendMessage(user.chatId, text);
          });

          bot.sendMessage(chatId, `✅ Matnli post ${users.length} userga yuborildi.`);
        }
        else {
          bot.sendMessage(chatId, "❌ Xato: rasm yoki matn yuboring.");
        }
      } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "❌ Post yuborishda xatolik yuz berdi.");
      }
    });
  });
};
