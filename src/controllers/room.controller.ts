import { Request, Response, NextFunction } from "express";
import { ensureRoom } from "../utils/room.helper";
import { roomService } from "../services/database/room.service";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { members = [], isGroup = false, name } = req.body;
    const userId = (req as any).userId;

    const room = await ensureRoom({ userId, members, isGroup, name });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    let queryFilter: { members: string; isGroup?: boolean } = { members: userId };
    const type = req.query.type as string | undefined;

    if (type === "group") {
      queryFilter.isGroup = true;
    } else if (type === "direct") {
      queryFilter.isGroup = false;
    }

    const [rooms, total] = await Promise.all([
      roomService.query({
        filter: queryFilter,
        ...((req as any).pagination || {}),
      }),
      roomService.count(queryFilter),
    ]);
    res.json({
      data: rooms,
      meta: {
        page: (req as any).pagination?.page || 1,
        perPage: (req as any).pagination?.limit || rooms.length,
        totalItems: total,
        totalPages: Math.ceil(
          total / ((req as any).pagination?.limit || rooms.length)
        ),
        currentCount: rooms.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
