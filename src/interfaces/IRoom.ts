import mongoose from "mongoose";
export interface IRoom {
  name?: string;
  isGroup: Boolean;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
