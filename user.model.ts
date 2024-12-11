
import { model, models, Schema } from "mongoose";

export interface IUser {
  // ...existing code...
}

const UserSchema = new Schema(
  {
    // ...existing code...
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;