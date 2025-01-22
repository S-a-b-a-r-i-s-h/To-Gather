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
  namelabel?: string;
  label?: string;
  type?: "text" | "number" | "select" | "textarea";  // Field types
  options?: string[];  // Options for select field, optional
  value?: string | number | string[];  // Field value, optional
}

export interface Participant {
  participantId: Types.ObjectId;  // Participant's ID
  dynamicFields?: DynamicField[];  // Dynamic fields for individual participants (optional)
}

export interface GroupEventDetails {
  name?: string;  // Team name
  members?: Types.ObjectId[];  // Members in the team
}

export interface IEvent {
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  community: Types.ObjectId;
  createdBy: Types.ObjectId;
  price: number;  // Price of the event
  participants?: Participant[];  // List of participants with their dynamic fields (optional)
  type: "individual" | "group";  // Type of event (either individual or group)
  teamSize?: number;  // Only relevant for group events (max team size)
  dynamicFields?: DynamicField[];  // Dynamic fields for the event (optional)
  groupDetails?: GroupEventDetails[];  // Group details for group events (optional)
}

const DynamicFieldSchema = new Schema<DynamicField>({
  namelabel: { type: String, required: false },
  label: { type: String, required: false },
  type: { type: String, enum: ["text", "number", "select", "textarea"], required: false },
  options: { type: [String], required: false },  // Options for select field
  value: { type: Schema.Types.Mixed, required: false },  // Allowing mixed types for value
}, { _id: false });

const ParticipantSchema = new Schema<Participant>({
  participantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dynamicFields: { type: [DynamicFieldSchema], required: false },  // Optional dynamic fields for participants
}, { _id: false });

const GroupEventDetailsSchema = new Schema<GroupEventDetails>({
  name: { type: String, required: false },
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
});

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, required: true },
  community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  dynamicFields: { type: [DynamicFieldSchema], required: false },  // Dynamic fields for the event
  participants: { type: [ParticipantSchema] },  // List of participants with their dynamic fields
  type: { type: String, enum: ["individual", "group"], required: true },
  teamSize: { type: Number, required: false },  // Only for group events
  groupDetails: { type: [GroupEventDetailsSchema], required: false },  // Group details for group events
}, { timestamps: true });

const Event = models?.Event || model<IEvent>("Event", EventSchema);

export default Event;


