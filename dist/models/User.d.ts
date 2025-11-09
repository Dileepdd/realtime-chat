import mongoose, { Document } from 'mongoose';
import { IUser } from '../interfaces/IUser.js';
export interface IUserDocument extends IUser, Document {
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map