import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: Types.ObjectId;
    pagination?: {
      page?: number;
      limit?: number;
    };
  }
}
