import { getAllUsers } from "../controllers/userController.js";
import { getAllChats } from "../controllers/chatController.js";

export const statsCommand = (bot) => {
  bot.onText(/\/stats/, async (msg) => {
    try {
      const users = await getAllUsers();
      const totalUsers = users.length;

      const chats = await getAllChats();
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
