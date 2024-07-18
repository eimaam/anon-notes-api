import { model, Schema } from "mongoose";
import { IReply } from "../types/types";

export const replySchema = new Schema<IReply>({
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    thread: { type: Schema.Types.ObjectId, ref: "Thread", required: true, index: true },
    content: { type: String, required: true, maxlength: 300 },
})

export const ReplyModel = model<IReply>("Reply", replySchema);