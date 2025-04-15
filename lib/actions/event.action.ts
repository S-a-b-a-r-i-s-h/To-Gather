"use server";

import mongoose, { FilterQuery } from "mongoose";

import { Event } from "@/database";
// import Community from "@/database/community.model";
// import {
//   ActionResponse,
//   ErrorResponse,
// } from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  dummySchema,
  GetEventSchema,
  PaginatedSearchParamsSchema,
  UpdateEventParticipantsSchema,
} from "../validations";

export async function createEvent(
  params: dummyParams
): Promise<ActionResponse<Events>> {
  console.log(params);
  const validationResult = await action({
    params,
    schema: dummySchema,
    authorize: true,
  });

  console.log(validationResult + "validationResult");

  if (validationResult instanceof Error) {
    console.log("validationerrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    title,
    description,
    date,
    imageUrl,
    price,
    type,
    teamSize,
    participants,
    communityId,
    dynamicFields,
    groupDetails,
  } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the event
    const [event] = await Event.create(
      [
        {
          title,
          description,
          date,
          price: Number(price),
          type,
          imageUrl,
          teamSize,
          participants,
          community: communityId,
          createdBy: userId,
          dynamicFields,
          groupDetails,
        },
      ],
      { session }
    );

    if (!event) {
      throw new Error("Failed to create Event");
    }

    // Update the community with the new event
    // const community = await Community.findById(communityId).session(session);
    // if (!community) {
    //   throw new Error("Community not found");
    // }

    // community.events.push(event._id);
    // await community.save({ session });

    // Optionally, associate the event with the user
    //   const user = await User.findById(userId).session(session);
    //   if (!user) {
    //     throw new Error("User not found");
    //   }

    //   user.events.push(event._id);
    //   await user.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function updateEventParticipants(
  params: UpdateEventParticipantsParams
): Promise<ActionResponse<Events>> {
  const validationResult = await action({
    params,
    schema: UpdateEventParticipantsSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { eventId, participantId, datadynamicFields, newGroup, groupAction } =
    validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update the event
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error("Event not found");
    }

    event.participants.push({
      participantId,
      dynamicFields: datadynamicFields,
    });
    if (groupAction === "create") {
      event.groupDetails.push(newGroup);
    } else if (groupAction === "join") {
      // map through the groupDetails and find the group with the same name the push the participantId to the members array
      // event.groupDetails.forEach(
      //   (group: { name: string; members: string[]; _id: string }) => {
      //     if (group._id === newGroup.name) {
      //       group.members.push(participantId);
      //     }
      //   }
      // );
      // const groupToUpdate = event.groupDetails.find(
      //   (group: { name: string; members: string[]; _id: string }) => group._id === newGroup.name
      // );
      // console.log("groupToUpdate", groupToUpdate);
      // if (groupToUpdate) {
      //   groupToUpdate.members = [...groupToUpdate.members, participantId];
      // }
      event.groupDetails.forEach((group: { name: string; members: string[]; _id: string}) => {
        if (group._id.toString() === newGroup.name) {
          group.members.push(participantId);
        } else {
          console.log("Group not found", group._id.toString(), newGroup.name);
        }
      })
    }
    await event.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getEventById(
  params: GetEventParams
): Promise<ActionResponse<Events>> {
  console.log(params);
  const validationResult = await action({
    params,
    schema: GetEventSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { eventId } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the event
    const event = await Event.findById(eventId)
      .populate("createdBy", "name image _id")
      .populate("participants.participantId", "name image _id")
      .populate("groupDetails.members", "name image _id")

    if (!event) {
      throw new Error("Failed to create Event");
    }

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getEventsByCommunityId(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ events: Events[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter, id } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Event> = { community: id };

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "individual":
      filterQuery.type = "individual";
      sortCriteria = { createdAt: -1 };
      break;
    case "group":
      filterQuery.type = "group";
      sortCriteria = { createdAt: -1 };
      break;
    case "past":
      filterQuery.date = { $lt: new Date() };
      sortCriteria = { date: -1 };
      break;
    case "upcoming":
      filterQuery.date = { $gte: new Date() };
      sortCriteria = { date: 1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalEvents = await Event.countDocuments(filterQuery);
    console.log(totalEvents);
    console.log("id is" + id);

    const events = await Event.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    console.log("filterQuery is" + filterQuery);
    console.log("events are" + events);

    const isNext = totalEvents > skip + events.length;

    return {
      success: true,
      data: { events: JSON.parse(JSON.stringify(events)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getEventsByUserId(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ events: Events[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter, id } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Event> = { createdBy: id };

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "individual":
      filterQuery.type = "individual";
      sortCriteria = { createdAt: -1 };
      break;
    case "group":
      filterQuery.type = "group";
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalEvents = await Event.countDocuments(filterQuery);
    console.log(totalEvents);
    console.log("id is" + id);

    const events = await Event.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    console.log("filterQuery is" + filterQuery);
    console.log("events are" + events);

    const isNext = totalEvents > skip + events.length;

    return {
      success: true,
      data: { events: JSON.parse(JSON.stringify(events)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getEvents(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ events: Events[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Event> = {};

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "individual":
      filterQuery.type = "individual";
      sortCriteria = { createdAt: -1 };
      break;
    case "group":
      filterQuery.type = "group";
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalEvents = await Event.countDocuments(filterQuery);

    const events = await Event.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalEvents > skip + events.length;

    return {
      success: true,
      data: { events: JSON.parse(JSON.stringify(events)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
