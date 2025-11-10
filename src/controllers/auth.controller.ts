import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userService } from '../services/database/user.service.js';
import { IUser } from '../interfaces/IUser.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { username, email, password, firstname, lastname } = req.body as IUser;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'Required fields are missing' });

  try {
    const existingUser = await userService.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using service with optional fields safely
    const user = await userService.create({
      username,
      email,
      password: hashedPassword,
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    console.time('signin');
    const { email, password } = req.body as IUser;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    console.time('user');
    const user = await userService.findByEmailWithPassword(email);
    console.timeEnd('user');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    console.time('isMatch');
    const isMatch = await bcrypt.compare(password, user.password);
    console.timeEnd('isMatch');
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    console.timeEnd('signin');

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User verified successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err: unknown) {
    console.error('Login error:', err);

    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: 'Server error during login',
        error: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: String(err),
    });
  }
};
