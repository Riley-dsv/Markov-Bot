import { model, Schema, Types } from "mongoose";

export interface MessageDocument {
  _id: Types.ObjectId;
  guildId: string;
  channelId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
  _id: { type: Types.ObjectId, required: true },
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const MessageModel = model<MessageDocument>("message", messageSchema);
