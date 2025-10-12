import mongoose from "mongoose";
export interface IMessage {
  roomId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  type: "text" | "image" | "file" | "video";
  deliveredTo: mongoose.Types.ObjectId[];
  seenBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
