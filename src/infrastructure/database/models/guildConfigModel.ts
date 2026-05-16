import { model, Schema, Types } from "mongoose";

export interface GuildConfigDocument {
  _id: Types.ObjectId;
  guildId: string;
  bannedWords: string[];
  bannedChannels: string[];
}

const guildConfigSchema = new Schema<GuildConfigDocument>({
  _id: { type: Types.ObjectId, required: true },
  guildId: { type: String, required: true },
  bannedChannels: { type: [String], required: false, default: [] },
  bannedWords: { type: [String], required: false, default: [] },
});

export const GuildConfigModel = model<GuildConfigDocument>(
  "guildConfig",
  guildConfigSchema,
);
