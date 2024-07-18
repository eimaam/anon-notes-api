import { Document, Types } from "mongoose";

export enum RoleEnum {
    ADMIN = "admin",
    USER = "user"
}

export interface IUser extends Document {
    fullName?: string;
    avatar?: string;
    username: string;
    email?: string;
    password: string;
    bio?: string;
    role: RoleEnum;
}

export interface IThread extends Document {
    creator: Types.ObjectId
    title: string;
    replies: Types.ObjectId[];
}

export interface IReply extends Document {
    creatorId: Types.ObjectId;
    thread: Types.ObjectId;
    content: string;
}
