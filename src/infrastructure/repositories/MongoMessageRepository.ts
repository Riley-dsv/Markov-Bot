import { Types } from "mongoose";
import type {
  IMessageRepository,
  CorpusMessage,
} from "../../application/ports/IMessageRepository";
import { DatabaseService } from "../database/databaseService";
import { MessageModel } from "../database/models/messageModel";

export class MongoMessageRepository implements IMessageRepository {
  public constructor(private readonly database: DatabaseService) {}

  async save(message: CorpusMessage): Promise<void> {
    await this.database.create(MessageModel, {
      _id: new Types.ObjectId(),
      guildId: message.guildId,
      channelId: message.channelId,
      authorId: message.authorId,
      content: message.content,
      createdAt: message.collectedAt,
    });
  }
  async findByChannel(channelId: string): Promise<CorpusMessage[]> {
    const documents = await this.database.getAll(MessageModel, { channelId });
    return documents.map(
      (doc) =>
        ({
          guildId: doc.guildId,
          channelId: doc.channelId,
          authorId: doc.authorId,
          content: doc.content,
          collectedAt: doc.createdAt,
        }) satisfies CorpusMessage,
    );
  }
}
