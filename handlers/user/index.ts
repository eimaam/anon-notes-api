import { Request, Response } from "express";
import { UserModel } from "../../models/User";
import { IUser } from "../../types/types";

export class UserController {
  static async create(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    try {
      const existingUser = await UserModel.findOne({ username });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      const newUser = await UserModel.create(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error?.message,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error?.message,
      });
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({
        success: true,
        message: "Users data fetched successfully",
        total: users?.length,
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error?.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { userId } = req.params;
    const { username, fullName, bio, avatar } = req.body;

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const userData:Partial<IUser> = {
        username,
        fullName,
        bio,
        avatar,
      };

      const updatedUser:IUser = await UserModel.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
      }).select("-password") as IUser;

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error?.message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      // not checking for user existence here as the middleware for token verification does that.
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error?.message,
      });
    }
  }
}
