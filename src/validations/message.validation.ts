import z from "zod";

export const MessageSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["text", "image", "file", "video"]).optional(),
});
