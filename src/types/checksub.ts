import { Context } from "grammy";
import { SessionData } from "../interfaces/sessioninterface";

const channelId: number = -1002133423126;

export default async function check_sub(
  ctx: Context,
  start_from_id?: number
): Promise<SessionData> {
  if (ctx) {
    const userIdToCheck: number = ctx.callbackQuery?.from?.id;
    const from_id_msg: number = start_from_id;
    if (userIdToCheck) {
      try {
        const chatMember = await ctx.api.getChatMember(
          channelId,
          userIdToCheck
        );
        if (
          chatMember.status === "member" ||
          chatMember.status === "administrator" ||
          chatMember.status === "creator"
        ) {
          await ctx.reply(
            "Obuna bo'ldingiz! .heic formatdagi faylni yuborishingiz mumkun!"
          );
          return { isSubscribe: true };
        } else {
          await ctx.reply(`Iltimos obuna bo'ling!`);
          return { isSubscribe: false };
        }
      } catch (error) {
        console.error("Xatolik", error);
        await ctx.answerCallbackQuery(`Xatolik`);
        return { isSubscribe: false };
      }
    } else if (from_id_msg) {
      try {
        const chatMember = await ctx.api.getChatMember(channelId, from_id_msg);
        if (
          chatMember.status === "member" ||
          chatMember.status === "administrator" ||
          chatMember.status === "creator"
        ) {
          return { isSubscribe: true };
        } else {
          return { isSubscribe: false };
        }
      } catch (error) {
        console.error("Xatolik", error);
        return { isSubscribe: false };
      }
    }
  }
  // Default return statement
  return { isSubscribe: false };
}
