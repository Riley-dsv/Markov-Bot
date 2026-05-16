import { connect } from "mongoose";
import type { Model, QueryFilter, UpdateQuery } from "mongoose";

export class DatabaseService {
  public async openDatabase(uri: string) {
    await connect(uri);
  }

  public async create<TDoc>(
    model: Model<TDoc>,
    data: Partial<TDoc>,
  ): Promise<TDoc> {
    const document = new model({ ...data });
    const savedDocument = await document.save();
    return savedDocument.toObject() as TDoc;
  }

  public async getOne<TDoc>(
    model: Model<TDoc>,
    query: QueryFilter<TDoc>,
  ): Promise<TDoc | null> {
    return model.findOne(query).lean<TDoc>().exec();
  }

  public async getAll<TDoc>(
    model: Model<TDoc>,
    query: QueryFilter<TDoc> = {},
  ): Promise<TDoc[]> {
    return model.find(query).lean<TDoc[]>().exec();
  }

  public async updateOne<TDoc>(
    model: Model<TDoc>,
    query: QueryFilter<TDoc>,
    updates: UpdateQuery<TDoc>,
  ): Promise<TDoc | null> {
    return model
      .findOneAndUpdate(query, updates, { new: true })
      .lean<TDoc>()
      .exec();
  }

  public async remove<TDoc>(
    model: Model<TDoc>,
    query: QueryFilter<TDoc>,
  ): Promise<boolean> {
    const deleteResponse = await model.deleteOne(query).exec();
    return deleteResponse.deletedCount > 0;
  }

  public async upsert<TDoc>(
    model: Model<TDoc>,
    query: QueryFilter<TDoc>,
    updates: UpdateQuery<TDoc>,
  ): Promise<TDoc | null> {
    return model
      .findOneAndUpdate(query, updates, { new: true, upsert: true })
      .lean<TDoc>()
      .exec();
  }
}
