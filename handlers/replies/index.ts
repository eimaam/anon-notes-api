import { Request, Response } from "express";
import { UserModel } from "../../models/User";
import { ThreadModel } from "../../models/Threads";
import { withMongoTransaction } from "../../utils/mongo.transaction";
import { ReplyModel } from "../../models/Replies";

export class ReplyController {
    static async create(req: Request, res: Response) {
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
}