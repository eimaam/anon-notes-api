import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";
import bcrypt from "bcrypt";

export const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: false,
    index: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true, // Adding sparse option to allow multiple null values
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  bio: {
    type: String,
    required: false,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next: any) {
  try {
    const saltRounds = 10;
const hashedPassword = await bcrypt.hash(this.password, saltRounds);

this.password = hashedPassword;
  } catch (error: any) {
    console.log("Error in userSchema.pre save", error);
    next(error);
  }
});

// compare passwords method
userSchema.methods.comparePassword = async function (userPassword: string) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (error: any) {
    console.log("Error in userSchema compare password method", error);
    throw new Error(error);
  }
};


export const UserModel = mongoose.model<IUser>("User", userSchema);
