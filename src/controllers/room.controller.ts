import { Request, Response } from 'express';
import { ensureRoom } from '../utils/room.helper.js';
import { roomService } from '../services/database/room.service.js';

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { members = [], isGroup = false, name } = req.body;
    const userId = req.userId;

    const room = await ensureRoom({ userId, members, isGroup, name });
    res.status(201).json({
      status: 201,
      success: true,
      message: 'Room created successfully',
      data: room,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const queryFilter: { members: string; isGroup?: boolean } = {
      members: userId,
    };
    const type = req.query.type as string | undefined;

    if (type === 'group') {
      queryFilter.isGroup = true;
    } else if (type === 'direct') {
      queryFilter.isGroup = false;
    }

    const [rooms, total] = await Promise.all([
      roomService.query({
        filter: queryFilter,
        ...(req.pagination || {}),
        populate: 'members',
        // select : "select name"
      }),
      roomService.count(queryFilter),
    ]);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Rooms fetched successfully',
      data: rooms,
      meta: {
        page: req.pagination?.page || 1,
        perPage: req.pagination?.limit || rooms.length,
        totalItems: total,
        totalPages: Math.ceil(total / (req.pagination?.limit || rooms.length)),
        currentCount: rooms.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
