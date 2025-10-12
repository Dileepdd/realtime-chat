import { messageService } from "../services/database/message.service";
import { Request, Response, NextFunction } from "express";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId, content, type } = req.body;
    const userId = (req as any).userId;

    const message = await messageService.create({
      roomId,
      senderId: userId,
      content,
      type,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}