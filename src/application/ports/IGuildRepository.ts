export interface GuildConfig {
  guildId: string;
  bannedWords: string[];
  bannedChannels: string[];
}

export interface IGuildConfigRepository {
  save(config: GuildConfig): Promise<void>;
  findByGuildId(guildId: string): Promise<GuildConfig | null>;
}
