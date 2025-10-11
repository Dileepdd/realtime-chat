import mongoose, {Schema, Document} from "mongoose";

import {IUser} from "../interfaces/IUser";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
  },
  {timestamps: true}
);

export const User = mongoose.model<IUserDocument>("User", UserSchema);