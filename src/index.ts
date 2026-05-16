import { Client } from "discord.js";
import { LearnFromMessage } from "./application/use-cases/learnFromMessage";
import { DatabaseService } from "./infrastructure/database/databaseService";
import { MongoMessageRepository } from "./infrastructure/repositories/MongoMessageRepository";
import { createMessageCreateHandler } from "./adapter/discord/eventHandlers/messageCreateHandler";
import { configDotenv } from "dotenv";
import { createGuildCreateHandler } from "./adapter/discord/eventHandlers/guildCreateHandler";
import { MongoGuildConfigRepository } from "./infrastructure/repositories/MongoGuildConfigRepository";
import { FirstJoinConfigGeneration } from "./application/use-cases/firstJoinConfigGeneration";

configDotenv();

async function main(): Promise<void> {
  const databaseService = new DatabaseService();
  await databaseService.openDatabase(process.env.MONGO_URI ?? "");

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

  await client.login(process.env.TOKEN);
}

void (await main());
