import dotenv from 'dotenv';
dotenv.config();

const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);

export const adminHelpCommand = (bot) => {
  bot.onText(/\/help|\/menu/, async (msg) => {
    if (msg.chat.id !== ADMIN_CHAT_ID) return;

    const message = `🛠 *Admin Bot Qo‘llanmasi*\n\n` +
      `1️⃣ /ads - Rasmli post yuborish (hammaga yoki tanlangan userga)\n` +
      `2️⃣ /admin - Foydalanuvchilar ro‘yxati va Telegram profil linklari\n` +
      `3️⃣ /contact - Userlardan kelgan xabarlarni ko‘rish\n` +
      `4️⃣ /stats - Foydalanuvchilar soni va statistik ma'lumot\n` +
      `5️⃣ /help yoki /menu - Bu qo‘llanmani ko‘rsatish`;

    const keyboard = {
      inline_keyboard: [
        [{ text: "Foydalanuvchilar ro'yxati", callback_data: "users_list" }],
        [{ text: "Rasmli post yuborish", callback_data: "send_post" }],
        [{ text: "Statistika", callback_data: "stats" }],
      ]
    };

    bot.sendMessage(ADMIN_CHAT_ID, message, {
      parse_mode: "Markdown",
      reply_markup: keyboard
    });
  });

  // Inline tugmalar callback handling
  bot.on('callback_query', async (callbackQuery) => {
    const data = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;

    switch (data) {
      case "users_list":
        bot.sendMessage(chatId, "📋 Foydalanuvchilar ro‘yxatini ko‘rish uchun /admin komandasini ishlating.");
        break;
      case "send_post":
        bot.sendMessage(chatId, "📷 Rasmli post yuborish uchun /ads komandasini ishlating.");
        break;
      case "stats":
        bot.sendMessage(chatId, "📊 Foydalanuvchilar soni va statistikani ko‘rish uchun /stats komandasini ishlating.");
        break;
      default:
        bot.sendMessage(chatId, "❌ Noma'lum tanlov");
    }

    // Tugma bosilgandan keyin callbackni yakunlash
    bot.answerCallbackQuery(callbackQuery.id);
  });
};
