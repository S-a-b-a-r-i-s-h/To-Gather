import { model, models, Schema, Types } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  type: "Workshop" | "Hackathon";
  date: Date;
  community: Types.ObjectId;
  createdBy: Types.ObjectId;
  participants: Types.ObjectId[];
  group?: {
    name: string;
    members: Types.ObjectId[];
  };
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["Workshop", "Hackathon"],
      required: true,
    },
    date: { type: Date, required: true },
    community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    group: {
      name: { type: String },
      members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

const Event = models?.Event || model<IEvent>("Event", EventSchema);

export default Event;
