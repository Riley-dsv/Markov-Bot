import { connect, QueryFilter, UpdateQuery } from "mongoose";

import { ModelDoc, ModelOf, ModelRegistry } from "./models/modelRegistry";

export class DatabaseService {
  public async openDatabase(uri: string) {
    await connect(uri);
  }

  public async create<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    data: Partial<ModelDoc<N>>,
  ): Promise<ModelDoc<N>> {
    const document = new model({ ...data });
    const savedDocument = await document.save();
    return savedDocument.toObject() as ModelDoc<N>;
  }

  public async getOne<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    query: QueryFilter<ModelDoc<N>>,
  ): Promise<ModelDoc<N> | null> {
    return model.findOne(query).lean<ModelDoc<N>>().exec();
  }

  public async getAll<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    query?: QueryFilter<ModelDoc<N>>,
  ): Promise<ModelDoc<N>[]> {
    return model.find(query).lean<ModelDoc<N>[]>().exec();
  }

  public async updateOne<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    query: QueryFilter<ModelDoc<N>>,
    updates: UpdateQuery<ModelDoc<N>>,
  ): Promise<ModelDoc<N> | null> {
    return model
      .findOneAndUpdate(query, updates, { new: true })
      .lean<ModelDoc<N>>()
      .exec();
  }

  public async remove<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    query: QueryFilter<ModelDoc<N>>,
  ): Promise<boolean> {
    const deleteResponse = await model.deleteOne(query).exec();
    return deleteResponse.deletedCount > 0;
  }

  public async upsert<N extends keyof ModelRegistry>(
    model: ModelOf<N>,
    query: QueryFilter<ModelDoc<N>>,
    updates: UpdateQuery<ModelDoc<N>>,
  ): Promise<ModelDoc<N> | null> {
    return model
      .findOneAndUpdate(query, updates, { new: true, upsert: true })
      .lean<ModelDoc<N>>()
      .exec();
  }
}
