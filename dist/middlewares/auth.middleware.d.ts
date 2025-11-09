import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
interface AuthRequest extends Request {
    userId?: Types.ObjectId;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map