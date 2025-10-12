import { roomService } from "../services/database/room.service";
import mongoose, { mongo } from "mongoose";

export const ensureRoom = async ({
  userId,
  members = [],
  isGroup = false,
  name,
}: {
  userId: mongoose.Types.ObjectId;
  members?: mongoose.Types.ObjectId[];
  isGroup?: boolean;
  name?: string;
}) => {
  // Add creator to members if not present
  if (!members.includes(userId)) {
    members.push(userId);
  }

  // Ensure members unique
  members = Array.from(new Set(members));

  // Handle direct message — reuse existing room if it exists
  if (!isGroup) {
    // For DM: must have exactly 2 participants (sender & receiver)
    members = members.slice(0, 2);

    const existing = await roomService.findOne({
      isGroup: false,
      members: { $all: members, $size: 2 },
    });

    if (existing) return existing;
  }

  // Otherwise, create a new room
  const newRoom = await roomService.create({
    isGroup,
    members,
    createdBy: userId,
    ...(name && { name }),
  });

  return newRoom;
};
