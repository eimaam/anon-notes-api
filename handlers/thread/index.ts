import { Request, Response } from "express";
import { ThreadModel } from "../../models/Threads";

export class ThreadController {
  static async create(req: Request, res: Response) {
    const { title, userId } = req.body;

    try {
      const newThread = await ThreadModel.create({ title, creator: userId });

      return res.status(201).json({
        success: true,
        message: "Thread created successfully",
        data: newThread,
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
    const { threadId } = req.params;

    try {
      const thread = await ThreadModel.findById(threadId).populate("creator");

      if (!thread) {
        return res.status(404).json({
          success: false,
          message: "Thread not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: thread,
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
      const threads = await ThreadModel.find().populate("creator");
      return res.status(200).json({
        success: true,
        message: "Threads data fetched successfully",
        total: threads?.length,
        data: threads,
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
    const { threadId } = req.params;
    const { title } = req.body;

    try {
      const thread = await ThreadModel.findByIdAndUpdate(
        threadId,
        { title },
        { new: true, runValidators: true }
      );

      if (!thread) {
        return res.status(404).json({
          success: false,
          message: "Thread not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Thread updated successfully",
        data: thread,
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
    const { threadId } = req.params;

    try {
      const thread = await ThreadModel.findByIdAndDelete(threadId);

      if (!thread) {
        return res.status(404).json({
          success: false,
          message: "Thread not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Thread deleted successfully",
        data: thread,
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
