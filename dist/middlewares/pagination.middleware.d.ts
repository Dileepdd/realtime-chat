import { Request, Response, NextFunction } from 'express';
export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
    sort?: Record<string, 1 | -1>;
}
export declare const paginationMiddleware: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=pagination.middleware.d.ts.map