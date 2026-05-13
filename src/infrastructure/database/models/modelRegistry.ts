import { Model } from "mongoose";
import { MessageDocument } from "./messageModel";

export interface ModelRegistry {
  Message: MessageDocument;
}

export type ModelDoc<N extends keyof ModelRegistry> = ModelRegistry[N];
export type ModelOf<N extends keyof ModelRegistry> = Model<ModelRegistry[N]>;
