import { model, models, Schema, Types } from "mongoose";

export interface ICommunity {
  title: string;
  description: string;
  img: string;
  price: string;
  admin: Types.ObjectId;
  secondaryAdmins: Types.ObjectId[];
  members: Types.ObjectId[];
}

const CommunitySchema = new Schema<ICommunity>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    secondaryAdmins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Community =
  models?.Community || model<ICommunity>("Community", CommunitySchema);

export default Community;
