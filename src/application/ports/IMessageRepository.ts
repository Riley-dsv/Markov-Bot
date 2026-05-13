export interface CorpusMessage {
  guildId: string;
  channelId: string;
  authorId: string;
  content: string;
  collectedAt: Date;
}

export interface IMessageRepository {
  save(message: CorpusMessage): Promise<void>;
  findByChannel(channelId: string): Promise<CorpusMessage[]>;
}
