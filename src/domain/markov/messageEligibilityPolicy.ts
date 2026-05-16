import { CorpusMessage } from "../../application/ports/IMessageRepository";

const MIN_CONTENT_LENGTH = 2;
const MAX_CONTENT_LENGTH = 500;
const MAX_MENTION_COUNT = 3;

const COMMAND_PREFIXES = ["!", "/", ".", "?"];

export class MessageEligibilityPolicy {
  private startsWithCommandPrefix(content: string): boolean {
    return COMMAND_PREFIXES.some((prefix) => content.startsWith(prefix));
  }

  private isOutOfRange(content: string): boolean {
    return (
      content.length < MIN_CONTENT_LENGTH || content.length > MAX_CONTENT_LENGTH
    );
  }

  private isURLOnly(content: string): boolean {
    return /^https?:\/\/\S+$/u.test(content);
  }

  private hasTooMuchMentions(content: string): boolean {
    const matches = content.match(/<@!?\d+>|<@&\d+>|<#\d+>/gu) ?? "";
    return matches?.length > MAX_MENTION_COUNT;
  }

  private isMentionOnly(content: string): boolean {
    return /^(<@!?\d+>|<@&\d+>|<#\d+>|\s)+$/u.test(content);
  }

  public canLearnFrom(input: CorpusMessage): boolean {
    const content = input.content;

    if (this.isOutOfRange(content)) return false;
    if (this.startsWithCommandPrefix(content)) return false;
    if (this.isURLOnly(content)) return false;
    if (this.hasTooMuchMentions(content)) return false;
    if (this.isMentionOnly(content)) return false;

    return true;
  }
}
