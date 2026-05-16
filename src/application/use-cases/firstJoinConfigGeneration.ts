import { GuildConfig, IGuildConfigRepository } from "../ports/IGuildRepository";

export class FirstJoinConfigGeneration {
  public constructor(
    private readonly guildConfigRepository: IGuildConfigRepository,
  ) {}

  public async execute(config: GuildConfig): Promise<void> {
    await this.guildConfigRepository.save(config);
  }
}
