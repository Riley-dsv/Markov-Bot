import { Client } from "discord.js";
import { createGuildCreateHandler } from "./adapter/discord/eventHandlers/guildCreateHandler";
import { createMessageCreateHandler } from "./adapter/discord/eventHandlers/messageCreateHandler";
import { createReadyHandler } from "./adapter/discord/eventHandlers/readyHandler";
import { FirstJoinConfigGeneration } from "./application/use-cases/firstJoinConfigGeneration";
import { LearnFromMessage } from "./application/use-cases/learnFromMessage";
import { DatabaseService } from "./infrastructure/database/databaseService";
import { MongoGuildConfigRepository } from "./infrastructure/repositories/MongoGuildConfigRepository";
import { MongoMessageRepository } from "./infrastructure/repositories/MongoMessageRepository";
import { EnvConfig } from "./infrastructure/config/EnvConfig";
import { loadEnvConfig } from "./infrastructure/config/EnvLoader";

async function main(): Promise<void> {
  const envConfig: EnvConfig = loadEnvConfig();

  const databaseService = new DatabaseService();
  await databaseService.openDatabase(envConfig.mongoURI);

  const messageRepository = new MongoMessageRepository(databaseService);
  const learnFromMessage = new LearnFromMessage(messageRepository);

  const guildConfigRepository = new MongoGuildConfigRepository(databaseService);
  const firstJoinConfigGeneration = new FirstJoinConfigGeneration(
    guildConfigRepository,
  );

  const client = new Client({
    intents: 33281,
  });

  client.on("messageCreate", createMessageCreateHandler(learnFromMessage));
  client.on("guildCreate", createGuildCreateHandler(firstJoinConfigGeneration));

  await client.login(envConfig.token);
}

void (await main());
