import { Request, Response } from 'express';
import { userService } from '../services/database/user.service.js';

export const getMe = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const user = await userService.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const search = (req.query.search as string) || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {
      _id: { $ne: userId }, // exclude logged-in user
    };

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await userService.query({
      filter,
      select: '_id username firstname lastname email',
      skip,
      limit,
      sort: { firstname: 1 },
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
      meta: {
        page,
        perPage: limit,
        currentCount: users.length,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};
