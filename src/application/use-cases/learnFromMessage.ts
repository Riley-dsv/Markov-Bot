import { CorpusMessage, IMessageRepository } from "../ports/IMessageRepository";

export class LearnFromMessage {
  public constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(message: CorpusMessage): Promise<void> {
    if (message.content.trim().length === 0) return;

    await this.messageRepository.save(message);
  }
}
