import { Request, Response } from 'express';
export declare const createMessage: (req: Request, res: Response) => Promise<void>;
export declare const getMessagesByRoomId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=message.controller.d.ts.map