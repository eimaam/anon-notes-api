import { Document } from "mongoose";

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
