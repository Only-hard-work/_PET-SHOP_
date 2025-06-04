import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { JWT_SECRET } from "../config/config";

class AuthContoller {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const handlePassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: handlePassword,
      });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });

      res.status(201).json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // todo || !(await bcrypt.compare(password, user.password))
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
          expiresIn: "30d",
        });

        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            address: user.address,
            pets: (await user.getPets()) || [],
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  }
}

export default AuthContoller;
