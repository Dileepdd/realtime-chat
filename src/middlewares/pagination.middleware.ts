import { Request, Response, NextFunction } from 'express';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  sort?: Record<string, 1 | -1>;
}

export const paginationMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 20, 1), 100); // max limit to avoid abuse

  const sortField = (req.query.sortField as string) || 'createdAt';
  const sortOrder = (req.query.sortOrder as string) === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  // Attach to request object
  req.pagination = {
    page,
    limit,
    skip,
    sort: { [sortField]: sortOrder },
  } as PaginationParams;

  next();
};
