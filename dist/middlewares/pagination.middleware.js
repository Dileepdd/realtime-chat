export const paginationMiddleware = (req, _res, next) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100); // max limit to avoid abuse
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    // Attach to request object
    req.pagination = {
        page,
        limit,
        skip,
        sort: { [sortField]: sortOrder },
    };
    next();
};
//# sourceMappingURL=pagination.middleware.js.map