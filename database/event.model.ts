// import { model, models, Schema, Types } from "mongoose";

// export interface IEvent {
//   title: string;
//   description: string;
//   type: "Workshop" | "Hackathon";
//   date: Date;
//   community: Types.ObjectId;
//   createdBy: Types.ObjectId;
//   participants: Types.ObjectId[];
//   group?: {
//     name: string;
//     members: Types.ObjectId[];
//   };
// }

// export interface IEventDoc extends IEvent, Document {}
// const EventSchema = new Schema<IEvent>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     type: {
//       type: String,
//       enum: ["Workshop", "Hackathon"],
//       required: true,
//     },
//     date: { type: Date, required: true },
//     community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
//     createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     group: {
//       name: { type: String },
//       members: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     },
//   },
//   { timestamps: true }
// );

// const Event = models?.Event || model<IEvent>("Event", EventSchema);

// export default Event;



import { model, models, Schema, Types } from "mongoose";

export interface DynamicField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";  // Field types
  value?: string | number | string[];  // Field value, optional
}

export interface Participant {
  id: Types.ObjectId;  // Participant's ID
  dynamicFields?: DynamicField[];  // Dynamic fields for individual participants (optional)
}

export interface GroupEventDetails {
  name: string;  // Team name
  members: Types.ObjectId[];  // Members in the team
  dynamicFields?: DynamicField[];  // Dynamic fields for the group (optional)
}

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  community: Types.ObjectId;
  createdBy: Types.ObjectId;
  participants: Participant[];  // List of participants with their dynamic fields (optional)
  type: "individual" | "group";  // Type of event (either individual or group)
  teamSize?: number;  // Only relevant for group events (max team size)
  groupDetails?: GroupEventDetails[];  // Group details for group events (optional)
}

const DynamicFieldSchema = new Schema<DynamicField>({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ["text", "number", "select", "textarea"], required: true },
  value: { type: Schema.Types.Mixed, required: false },  // Allowing mixed types for value
}, { _id: false });

const ParticipantSchema = new Schema<Participant>({
  id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dynamicFields: { type: [DynamicFieldSchema], required: false },  // Optional dynamic fields for participants
}, { _id: false });

const GroupEventDetailsSchema = new Schema<GroupEventDetails>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  dynamicFields: { type: [DynamicFieldSchema], required: false },  // Optional dynamic fields for group details
}, { _id: false });

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: { type: [ParticipantSchema], required: true },  // List of participants with their dynamic fields
  type: { type: String, enum: ["individual", "group"], required: true },
  teamSize: { type: Number, required: false },  // Only for group events
  groupDetails: { type: [GroupEventDetailsSchema], required: false },  // Group details for group events
}, { timestamps: true });

const Event = models?.Event || model<IEvent>("Event", EventSchema);

export default Event;


