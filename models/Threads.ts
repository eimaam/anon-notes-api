import { model, Schema } from "mongoose";
import { IThread } from "../types/types";

export const threadSchema = new Schema<IThread>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      default: "Ask me anything",
    },
    replies: {
      type: [Schema.Types.ObjectId],
      
    },
  },
  { timestamps: true }
);

export const ThreadModel = model<IThread>("Thread", threadSchema);
