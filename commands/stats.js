import User from "../models/user.js";

export const statsCommand = (bot) => {
  bot.onText(/\/stats/, async (msg) => {
    try {
      const users = await User.find({}); // foydalanuvchilar
      const totalUsers = users.length;

      // Bot qo‘shilgan guruhlar va kanallar
      const chats = bot.getChats ? await bot.getChats() : []; // agar bot API qo‘llab-quvvatlasa
      const totalGroups = chats.filter(c => c.type === "group" || c.type === "supergroup").length;
      const totalChannels = chats.filter(c => c.type === "channel").length;

      let text = `📊 *Bot Statistikasi*\n\n`;
      text += `👥 Foydalanuvchilar soni: *${totalUsers}*\n`;
      text += `🏢 Guruhlar soni: *${totalGroups}*\n`;
      text += `📢 Kanallar soni: *${totalChannels}*\n\n`;

      if (totalUsers > 0) {
        text += `📝 Foydalanuvchilar:\n`;
        users.forEach((user, index) => {
          text += `${index + 1}. ${user.firstName || ""} ${user.lastName || ""} (@${user.username || "—"})\n`;
        });
      }

      bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
    } catch (err) {
      console.error("Stats komandasi xato:", err);
      bot.sendMessage(msg.chat.id, "⚠️ Statistika olishda xatolik yuz berdi!");
    }
  });
};
