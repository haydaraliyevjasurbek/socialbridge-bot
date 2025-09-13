import "dotenv/config"; // Muhit o'zgaruvchilarini yuklash
import TelegramBot from "node-telegram-bot-api"; // Telegram bot kutubxonasini import qilamiz
import { connectDB } from "./config/db.js"; // MongoDB ulanish funksiyasini import qilamiz
import { startCommand } from "./commands/start.js"; // modulni import qilamiz
// import { adminCommand } from "./commands/admin.js"; // modulni import qilamiz
import { adminHelpCommand } from "./commands/adminHelp.js"; // modulni import qilamiz
import { contactCommand } from "./commands/contactCommand.js"; // modulni import qilamiz
import { adsCommand } from "./commands/adsCommand.js"; // modulni import qilamiz
import { statsCommand } from "./commands/stats.js";
import { saveUser } from './controllers/userController.js';
import { saveChat } from './controllers/chatController.js';


// Muhit o'zgaruvchilarini tekshirish
const BOT_TOKEN = process.env.BOT_TOKEN; 
if (!BOT_TOKEN) {
  console.error(
    "Iltimos: BOT_TOKEN .env faylida borligiga ishonch hosil qiling!"
  );
  process.exit(1);
}

// polling rejimida ishga tushirish
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log("Bot ishga tushdi ✅");

// MongoDB ulanish
connectDB();

// Komandalarni ulash
startCommand(bot); // start komandasini ulash
// adminCommand(bot); // admin komandasini ulash
adminHelpCommand(bot); // Admin qo‘llanmasini ulash
contactCommand(bot); // contact komandasini ulash
adsCommand(bot); // reklama komandasini ulash
statsCommand(bot);

bot.on("message", async (msg) => {
  await saveUser(msg);      // foydalanuvchini saqlash
  await saveChat(msg.chat); // guruh yoki kanalni saqlash
});

// Botni toza to'xtatish
process.once("SIGINT", () => {
  console.log("Bot to'xtatildi (SIGINT)");
  process.exit(0);
});
process.once("SIGTERM", () => {
  console.log("Bot to'xtatildi (SIGTERM)");
  process.exit(0);
});
