import { MessageEligibilityPolicy } from "../../domain/markov/messageEligibilityPolicy";
import { CorpusMessage, IMessageRepository } from "../ports/IMessageRepository";

export class LearnFromMessage {
  public constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(message: CorpusMessage): Promise<void> {
    const messageEligibilityPolicy = new MessageEligibilityPolicy();

    if (!messageEligibilityPolicy.canLearnFrom(message)) return;

    await this.messageRepository.save(message);
  }
}
