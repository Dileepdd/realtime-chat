import z from "zod";

export const RoomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters").optional(),
  isGroup: z.boolean().optional(),
  members: z.array(z.string()).min(1, "At least one member is required"),
});
