export class DataService {
    model;
    constructor(model) {
        this.model = model;
    }
    // --------------------
    // Basic CRUD Methods
    // --------------------
    async create(data) {
        const doc = new this.model(data);
        return doc.save();
    }
    async findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async find(filter = {}) {
        return this.model.find(filter).exec();
    }
    async update(filter, update) {
        return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
    }
    async delete(filter) {
        return this.model.findOneAndDelete(filter).exec();
    }
    async count(filter = {}) {
        return this.model.countDocuments(filter).exec();
    }
    // --------------------
    // Advanced Query Method
    // --------------------
    async query(options) {
        const { filter = {}, select, populate, skip = 0, limit = 10, sort } = options;
        let query = this.model.find(filter);
        // Handle select
        if (select)
            query = query.select(select);
        // Handle populate
        if (populate) {
            let pop;
            if (typeof populate === 'string' || 'path' in populate) {
                pop = populate;
            }
            else if (Array.isArray(populate)) {
                pop = populate;
            }
            else {
                pop = [populate];
            }
            query = query.populate(pop);
        }
        // Handle skip & limit
        if (skip)
            query = query.skip(skip);
        if (limit)
            query = query.limit(limit);
        // Handle sort
        if (sort)
            query = query.sort(sort);
        return query.exec();
    }
}
//# sourceMappingURL=data.service.js.map