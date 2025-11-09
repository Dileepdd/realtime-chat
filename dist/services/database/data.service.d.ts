import { Model, Document, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';
interface QueryOptions<T> {
    filter?: FilterQuery<T>;
    select?: string | string[] | Record<string, 1 | 0>;
    populate?: string | PopulateOptions | Array<string | PopulateOptions>;
    skip?: number;
    limit?: number;
    sort?: string | Record<string, 1 | -1>;
}
export declare class DataService<T extends Document> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<Omit<T, keyof Document>>): Promise<T>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    find(filter?: FilterQuery<T>): Promise<T[]>;
    update(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null>;
    delete(filter: FilterQuery<T>): Promise<T | null>;
    count(filter?: FilterQuery<T>): Promise<number>;
    query(options: QueryOptions<T>): Promise<T[]>;
}
export {};
//# sourceMappingURL=data.service.d.ts.map