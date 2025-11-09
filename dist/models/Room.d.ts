import mongoose, { Document } from 'mongoose';
import { IRoom } from '../interfaces/IRoom.js';
export interface IRoomDocument extends IRoom, Document {
}
export declare const Room: mongoose.Model<IRoomDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRoomDocument, {}, {}> & IRoomDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Room.d.ts.map