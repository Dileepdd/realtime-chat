import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from '../interfaces/IMessage.js';

export interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema = new Schema(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'video'],
      default: 'text',
    },
    deliveredTo: { type: [Schema.Types.ObjectId], ref: 'User' },
    seenBy: { type: [Schema.Types.ObjectId], ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessageDocument>('Message', MessageSchema);
