import { saveUser } from "../controllers/userController.js";

export const startCommand = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    const ADMIN_CHAT_ID = Number(process.env.ADMIN_CHAT_ID);

    // Foydalanuvchini saqlash
    await saveUser(msg);

    // Inline tugmalar
    const keyboard = {
  inline_keyboard: [
    [
      { text: "Instagram", web_app: { url: "https://www.instagram.com/accounts/login/" } },
      { text: "YouTube", web_app: { url: "https://www.youtube.com/" } },
    ],
    [
      { text: "X (Twitter)", web_app: { url: "https://x.com/?lang=en" } },
      { text: "LinkedIn", web_app: { url: "https://www.linkedin.com/" } },
    ],
    [
      { text: "TikTok", web_app: { url: "https://www.tiktok.com/" } },
      { text: "Facebook", web_app: { url: "https://www.facebook.com/?locale=en_EN" } },
    ],
    [
      // Kanal yoki Telegram linki bo‘lsa web_app emas, oddiy url ishlatish kerak
      { text: "Web App'lar haqida", url: "https://t.me/it_zona_one" },
    ],
  ],
};


    bot.sendMessage(chatId, `Assalomu aleykum ${firstName} \n\nBizning Web App orqali ijtimoiy tarmoqlaringgizga telegramdan chiqmasdan bir tugama oraqli kiring! ${{ reply_markup: keyboard }}`);

    // Agar foydalanuvchi admin bo'lmasa yordam xabarini yuborish
    if (chatId !== ADMIN_CHAT_ID) {
      bot.sendMessage(
        chatId,
        `Agar yordam kerak bo'lsa, /contact buyrug'ini yuboring adminga xabaringgizni yozing. Admin 12 soat ichida javob beradi!`
      );
    }

    // Admin bo'lsa boshqa qo'llanma
    if (chatId === ADMIN_CHAT_ID) {
      bot.sendMessage(
        chatId,
        `Salom, ${firstName}! \n🌉 Social Bridge robot'ga xush kelibsiz. Siz admin panelga kira olasiz.\n\nAdmin uchun: /menu \nReklama yuborish /ads`
      );
    }
  });
};
