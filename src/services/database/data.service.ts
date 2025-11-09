import { Model, Document, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';

interface QueryOptions<T> {
  filter?: FilterQuery<T>;
  select?: string | string[] | Record<string, 1 | 0>;
  populate?: string | PopulateOptions | Array<string | PopulateOptions>;
  skip?: number;
  limit?: number;
  sort?: string | Record<string, 1 | -1>;
}

export class DataService<T extends Document> {
  constructor(protected model: Model<T>) {}

  // --------------------
  // Basic CRUD Methods
  // --------------------

  async create(data: Partial<Omit<T, keyof Document>>): Promise<T> {
    const doc = new this.model(data);
    return doc.save();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  // --------------------
  // Advanced Query Method
  // --------------------
  async query(options: QueryOptions<T>): Promise<T[]> {
    const { filter = {}, select, populate, skip = 0, limit = 10, sort } = options;

    let query = this.model.find(filter);

    // Handle select
    if (select) query = query.select(select);

    // Handle populate
    if (populate) {
      let pop: PopulateOptions | (string | PopulateOptions)[];
      if (typeof populate === 'string' || 'path' in (populate as PopulateOptions)) {
        pop = populate as PopulateOptions;
      } else if (Array.isArray(populate)) {
        pop = populate;
      } else {
        pop = [populate as PopulateOptions];
      }
      query = query.populate(pop);
    }

    // Handle skip & limit
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);

    // Handle sort
    if (sort) query = query.sort(sort);

    return query.exec();
  }
}
