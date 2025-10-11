import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userService } from "../services/database/user.service";
import { IUser } from "../interfaces/IUser";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { username, email, password, firstname, lastname } = req.body as IUser;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Required fields are missing" });

  try {
    const existingUser = await userService.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using service with optional fields safely
    const user = await userService.create({
      username,
      email,
      password: hashedPassword,
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

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
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser;

  try {
    const user = await userService.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
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
    res.status(500).json({ message: "Server error", error: err });
  }
};
