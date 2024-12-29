import { model, models, Schema, Types } from "mongoose";

export interface ICommunity {
  title: string;
  description: string;
  shortDescription: string;
  img: string;
  price: string;
  admin: Types.ObjectId;
  secondaryAdmins?: Types.ObjectId[];
  members?: Types.ObjectId[];
  linkedin?: string;
  x?: string;
  github?: string;
  instagram?: string;
  whatsapp?: string;
  website?: string;
}

export interface ICommunityDoc extends ICommunity, Document {}
const CommunitySchema = new Schema<ICommunity>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    secondaryAdmins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    linkedin: { type: String },
    x: { type: String },
    github: { type: String },
    instagram: { type: String },
    whatsapp: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const Community =
  models?.Community || model<ICommunity>("Community", CommunitySchema);

export default Community;
