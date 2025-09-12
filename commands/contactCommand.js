import 'dotenv/config';

const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);

export const contactCommand = (bot) => {
  bot.onText(/\/contact/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "✉️ Adminga xabar yuborish uchun rasm yoki matn yuboring:");

    // Foydalanuvchidan keyingi xabarni kutamiz
    bot.once('message', (userMsg) => {
      const firstName = userMsg.from.first_name;

      // Matn bo'lsa
      if (userMsg.text) {
        bot.sendMessage(
          ADMIN_CHAT_ID,
          `📩 User ${firstName} (${chatId}) dan xabar:\n\n${userMsg.text}`
        );
        bot.sendMessage(chatId, "✅ Xabaringiz adminga yuborildi.");
      }
      // Rasm bo'lsa
      else if (userMsg.photo) {
        const fileId = userMsg.photo[userMsg.photo.length - 1].file_id;
        const caption = userMsg.caption || "";

        bot.sendPhoto(
          ADMIN_CHAT_ID,
          fileId,
          { caption: `📩 User ${firstName} (${chatId}) dan rasmli xabar:\n${caption}` }
        );
        bot.sendMessage(chatId, "✅ Rasmli xabaringiz adminga yuborildi.");
      }
      else {
        bot.sendMessage(chatId, "❌ Xato: rasm yoki matn yuboring.");
      }
    });
  });
};
