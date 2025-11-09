import mongoose, { Schema, Document } from 'mongoose';
import { IRoom } from '../interfaces/IRoom.js';

export interface IRoomDocument extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String },
    isGroup: { type: Boolean },
    members: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model<IRoomDocument>('Room', RoomSchema);
