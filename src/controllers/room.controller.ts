import { Request, Response } from 'express';
import { ensureRoom } from '../utils/room.helper.js';
import { roomService } from '../services/database/room.service.js';
import { messageService } from '../services/database/message.service.js';

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
    if (type === 'group') queryFilter.isGroup = true;
    else if (type === 'direct') queryFilter.isGroup = false;

    // 🧱 Fetch rooms
    const [rooms, total] = await Promise.all([
      roomService.query({
        filter: queryFilter,
        ...(req.pagination || {}),
        populate: 'members',
        sort: { updatedAt: -1 },
      }),
      roomService.count(queryFilter),
    ]);

    const roomIds = rooms.map((r: any) => r._id);

    // 🧠 Use generic aggregate helper for last messages
    const lastMessages = await messageService.aggregate([
      { $match: { roomId: { $in: roomIds } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$roomId',
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          senderId: { $first: '$senderId' },
          deliveredTo: { $first: '$deliveredTo' },
          seenBy: { $first: '$seenBy' },
        },
      },
    ]);

    // Map for quick lookup
    const lastMessageMap = new Map(lastMessages.map((msg: any) => [msg._id.toString(), msg]));

    // Transform and fix names
    const transformedRooms = rooms.map((room: any) => {
      let name = room.name;
      if (!room.isGroup && Array.isArray(room.members)) {
        const otherMember = room.members.find((m: any) => m._id.toString() !== userId.toString());

        name =
          (otherMember?.firstname && otherMember?.lastname
            ? `${otherMember.firstname} ${otherMember.lastname}`
            : otherMember?.firstname || otherMember?.username) ||
          otherMember?.email ||
          'Unknown';
      }

      const lastMsg = lastMessageMap.get(room._id.toString());
      return {
        ...room.toObject?.(),
        name,
        lastMessage: lastMsg?.content || '',
        lastMessageAt: lastMsg?.createdAt || room.updatedAt,
        lastMessageSenderId: lastMsg?.senderId,
        deliveredTo: lastMsg?.deliveredTo || [],
        seenBy: lastMsg?.seenBy || [],
      };
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Rooms fetched successfully',
      data: transformedRooms,
      meta: {
        page: req.pagination?.page || 1,
        perPage: req.pagination?.limit || rooms.length,
        totalItems: total,
        totalPages: Math.ceil(total / (req.pagination?.limit || rooms.length)),
        currentCount: rooms.length,
      },
    });
  } catch (err) {
    console.error('Error in getRooms:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
