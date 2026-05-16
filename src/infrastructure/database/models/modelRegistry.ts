import { MessageModel } from "./messageModel";
import { GuildConfigModel } from "./guildConfigModel";

export const models = {
  Message: MessageModel,
  GuildConfig: GuildConfigModel,
} as const;
