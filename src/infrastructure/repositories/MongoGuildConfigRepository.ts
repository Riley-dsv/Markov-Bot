import { Types } from "mongoose";
import {
  GuildConfig,
  IGuildConfigRepository,
} from "../../application/ports/IGuildRepository";
import { DatabaseService } from "../database/databaseService";
import { GuildConfigModel } from "../database/models/guildConfigModel";

export class MongoGuildConfigRepository implements IGuildConfigRepository {
  public constructor(private readonly database: DatabaseService) {}

  public async save(config: GuildConfig): Promise<void> {
    await this.database.create(GuildConfigModel, {
      _id: new Types.ObjectId(),
      guildId: config.guildId,
      bannedWords: config.bannedWords,
      bannedChannels: config.bannedChannels,
    });
  }

  public async findByGuildId(guildId: string): Promise<GuildConfig | null> {
    const document = await this.database.getOne(GuildConfigModel, { guildId });
    return document;
  }
}
