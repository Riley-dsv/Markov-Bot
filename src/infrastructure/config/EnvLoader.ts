import { configDotenv } from "dotenv";
import { EnvConfig } from "./EnvConfig";

configDotenv();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (value == null || value.trim().length == 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function loadEnvConfig(): EnvConfig {
  return {
    devGuildId: getRequiredEnv("DEV_GUILD_ID"),
    production: getRequiredEnv("PRODUCTION") == "1",
    token: getRequiredEnv("TOKEN"),
    devId: getRequiredEnv("DEV_ID"),
    mongoURI: getRequiredEnv("MONGO_URI"),
  };
}
