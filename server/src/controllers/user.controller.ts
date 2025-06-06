import { Request, Response } from "express";
import User from "../models/user.model";

class UserController {
  static async getUserInfo(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const pets = (await user.getPets()) || [];

      res.status(200).json({
        ...user.toJSON(),
        pets,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default UserController;
