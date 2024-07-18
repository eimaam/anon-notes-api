import { Request, Response } from "express";
import { UserModel } from "../../models/User";
import { ThreadModel } from "../../models/Thread";
import { withMongoTransaction } from "../../utils/mongo.transaction";
import { ReplyModel } from "../../models/Reply";
import { validationResult } from "express-validator";

export class ReplyController {
    static async create(req: Request, res: Response) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
        }

        const { threadId, content } = req.body;

        if (!content) return res.status(400).json({ success: false, message: "Content is required" });
        if (!threadId) return res.status(400).json({ success: false, message: "Thread is required" });

        try {

            const result = await withMongoTransaction(async (session) => {

                const thread = await ThreadModel.findById(threadId).session(session); 

                if(!thread) {
                    throw {
                        status: 404,
                        message: "Thread not found"
                    }
                }

                const creator = await UserModel.findById(thread.creator).session(session);
                if(!creator) {
                    throw {
                        status: 404,
                        message: "Creator not found"
                    }
                }

                const data = {
                    creatorId: creator._id,
                    thread: threadId,
                    content
                }

                const newReply = await ReplyModel.create([data], { session} )

                await ThreadModel.findByIdAndUpdate(threadId, {
                    $push: {
                        replies: newReply[0]._id
                    },
                }, {
                    new: true,
                    runValidators: true
                }
                ).session(session);

                return newReply[0];

            });

            return res.status(201).json({ success: true, message: "Reply created successfully", data: result });

        } catch (error:any) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error?.message });
        }
    }

    static async getById(req: Request, res: Response) {
        const { replyId } = req.params;

        try {
            const reply = await ReplyModel.findById(replyId).populate("thread");

            if (!reply) {
                return res.status(404).json({ success: false, message: "Reply not found" });
            }

            return res.status(200).json({ success: true, message: "Reply data fetched successfully", data: reply });

        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error?.message });
        }
    }

    static async getAll(_req: Request, res: Response) {
        try {
            const replies = await ReplyModel.find();

            return res.status(200).json({
                success: true,
                message: "Replies data fetched successfully",
                total: replies?.length,
                data: replies,
            });

        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error?.message });
        }
    }

    static async getByThread(req: Request, res: Response) {
        const { threadId } = req.params;

        if (!threadId) return res.status(400).json({ success: false, message: "Thread is required" });

        try {

            const thread = await ThreadModel.findById(threadId);

            if (!thread) {
                return res.status(404).json({ success: false, message: "Thread not found" });
            }

            const replies = await ReplyModel.find({ thread: threadId });

            return res.status(200).json({
                success: true,
                message: "Replies data fetched successfully",
                total: replies?.length,
                data: replies,
            });

        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error?.message });
        }
    }
}