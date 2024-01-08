import { Bot, Context, InputFile, session, SessionFlavor } from "grammy";
import { Menu } from "@grammyjs/menu";
import { FileFlavor, hydrateFiles } from "@grammyjs/files";

import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import axios from "axios";
import heicConvert from "heic-convert";

import check_sub from "./types/checksub";
import { SessionData } from "./interfaces/sessioninterface";
import { sendData } from "./interfaces/sendData.interface";
import Bull from "bull";

import http from "http";

http
  .createServer((req, res) => {
    res.write("I'm alive heic_to_jpg");
    res.end();
  })
  .listen(3333);

// Create a bot.
type MyContext = FileFlavor<Context> & SessionFlavor<SessionData>;
const bot = new Bot<MyContext>(
  ""
);
bot.api.config.use(hydrateFiles(bot.token));
bot.use(session({ initial: () => ({ isSubscribe: false }) }));

const heicQueue = new Bull<sendData>("heic-queue", {
  redis: {
    host: "",
    password: "",
    port: "",
  },
});

const subscribeKeyboard = new Menu("my-menu-identifier")
  .url("1-kanal", "https://t.me/nodejs_backend_tm")
  .row()
  .text("Tekshrish✅", async (ctx) => {
    ctx.callbackQuery.data = "check_sub";
    await check_sub(ctx);
  });

bot.use(subscribeKeyboard);

bot.command("start", async (ctx) => {
  try {
    // Check subscription status
    const { isSubscribe } = await check_sub(ctx, ctx.message.from.id);
    ctx.session.isSubscribe = isSubscribe;
  } catch (error) {
    console.error("An error occurred while checking subscription:", error);
    // Log the error details or handle it appropriately
  }

  if (ctx.session?.isSubscribe === false) {
    await ctx.reply(
      `Assalomu aleykum ${ctx.message?.from.first_name}. \n Quydagilarga obuna bo'ling👇`,
      { reply_markup: subscribeKeyboard }
    );
  } else {
    await ctx.reply(
      `Assalomu aleykum ${ctx.message?.from.first_name}. Siz botdan foydalanishingiz mumkin! \n .heic formatdagi rasmni yuboring!`
    );
  }

  // Log the subscription status
  await bot.api.sendMessage(
    6207716858,
    `Foydalanuvchi ${ctx.from.first_name}, channel subscribe status: ${ctx.session?.isSubscribe}`
  );
});

bot.on(":document", async (ctx) => {
  try {
    // Check subscription status
    const { isSubscribe } = await check_sub(ctx, ctx.message?.from.id);
    ctx.session.isSubscribe = isSubscribe;
  } catch (error) {
    console.error("An error occurred while checking   subscription:", error);
    // Log the error details or handle it appropriately
  }
  console.log("job add session status:" + ctx.session?.isSubscribe);
  if (ctx.session?.isSubscribe === true) {
    try {
      const file_id = ctx.message?.document.file_id;
      const from_id = ctx.message?.from.id;
      console.log(ctx.message?.document);
      // Add job to the queue
      await heicQueue.add({ file_id, from_id });
      console.log(from_id);
    } catch (error) {
      console.error("Uchertta qo'shishdayi hatoliq", error);
    }
  } else if (ctx.message?.document.mime_type !== "image/heif") {
    await ctx.reply("Faqat heic formatdagi rasmalarni yuboring!");
  } else {
    await ctx.reply("Siz obuna bo'lmagansiz.Obuna bo'ling /start");
    console.log("session failed queue add " + ctx.session?.isSubscribe);
  }
});

// Process jobs in the queue
heicQueue.process(async function (job, done) {
  try {
    console.log("job:", job.data);
    const { file_id, from_id } = job.data;

    await bot.api.sendMessage(from_id, "Iltimos kuting⌛");

    const heicPath = join(__dirname, "public", `${randomUUID()}.HEIC`);
    const file = await bot.api.getFile(file_id);
    const file_path = file.file_path;

    const response = await axios.get(
      `https://api.telegram.org/file/bot${bot.token}/${file_path}`,
      { responseType: "arraybuffer" }
    );

    await promisify(writeFile)(heicPath, response.data);
    await job.progress(42);
    // Convert the file to JPEG
    const inputBuffer = await promisify(readFile)(heicPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 1,
    });
    const uint8Array = new Uint8Array(outputBuffer);
    await promisify(unlink)(heicPath);

    // Save the JPEG file
    const uuid = randomUUID();
    const jpegPath = join(__dirname, "jpeg", `${uuid}.jpg`);
    await promisify(writeFile)(jpegPath, uint8Array);

    console.log("jpegPath:", jpegPath);
    await bot.api.sendDocument(from_id, new InputFile(jpegPath));
    await promisify(unlink)(jpegPath);

    // Cleanup: Delete the temporary files
    console.log("Cleanup complete.");
  } catch (error) {
    console.error("HEIC TO JPG FUNCTION ERROR:", error);
  } finally {
    done();
  }
});
// Start the bot
bot.start();
console.log("Bot is running!");
