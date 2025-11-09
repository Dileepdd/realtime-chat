import mongoose, { Document } from 'mongoose';
import { IMessage } from '../interfaces/IMessage.js';
export interface IMessageDocument extends IMessage, Document {
}
export declare const Message: mongoose.Model<IMessageDocument, {}, {}, {}, mongoose.Document<unknown, {}, IMessageDocument, {}, {}> & IMessageDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=IMessage.d.ts.map