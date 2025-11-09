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
