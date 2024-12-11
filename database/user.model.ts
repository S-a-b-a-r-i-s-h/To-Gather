import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  communities?: string[];
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    github: { type: String },
    linkedin: { type: String },
    communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;