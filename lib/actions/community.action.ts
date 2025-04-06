"use server";

import mongoose, { FilterQuery } from "mongoose";

import { User } from "@/database";
import Community from "@/database/community.model";
// import {
//   ActionResponse,
//   Community,
//   ErrorResponse,
//   GradeCommunityMembersParams,
//   PaginatedSearchParams,
//   UpdateCommunityMembersParams,
// } from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CreateCommunitySchema,
  EditCommunitySchema,
  GetCommunitySchema,
  GradeCommunityMembersSchema,
  PaginatedSearchParamsSchema,
  UpdateCommunityMembersSchema,
} from "../validations";

export async function createCommunity(
  params: CreateCommunityParams
): Promise<ActionResponse<Community>> {
  const validationResult = await action({
    params,
    schema: CreateCommunitySchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    title,
    description,
    shortDescription,
    image,
    price,
    linkedin,
    x,
    github,
    instagram,
    whatsapp,
    website,
  } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [community] = await Community.create(
      [
        {
          title,
          description,
          shortDescription,
          img: image,
          price,
          admin: userId,
          linkedin,
          x,
          github,
          instagram,
          whatsapp,
          website,
        },
      ],
      { session }
    );
    if (!community) {
      throw new Error("Failed to create Community");
    }

    // Now update the user with the new community

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.communities.push(community._id);
    await user.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(community)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function editCommunity(
  params: EditCommunityParams
): Promise<ActionResponse<Community>> {
  const validationResult = await action({
    params,
    schema: EditCommunitySchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, description, shortDescription, image, price, communityId } =
    validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }
    if (community.admin.toString() !== userId) {
      throw new Error("Unauthorized");
    }
    if (community.title !== title) {
      community.title = title;
      await community.save({ session });
    }
    if (community.description !== description) {
      community.description = description;
      await community.save({ session });
    }
    if (community.shortDescription !== shortDescription) {
      community.shortDescription = shortDescription;
      await community.save({ session });
    }
    if (community.img !== image) {
      community.img = image;
      await community.save({ session });
    }
    if (community.price !== price) {
      community.price = price;
      await community.save({ session });
    }

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(community)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getCommunity(
  params: GetCommunityParams
): Promise<ActionResponse<Community>> {
  const validationResult = await action({
    params,
    schema: GetCommunitySchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { communityId } = validationResult.params!;

  try {
    // get the community by id and also i want the admin, secondaryAdmins and members. I need ther image and name.

    const community = await Community.findById(communityId)
      .populate("admin", "name image _id")
      .populate("secondaryAdmins", "name image _id")
      .populate("members", "name image _id");

    // const community = await Community.findById(communityId);

    if (!community) {
      throw new Error("Community not found");
    }

    return { success: true, data: JSON.parse(JSON.stringify(community)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getCommunities(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ communities: Community[]; isNext: boolean }>> {
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

  const filterQuery: FilterQuery<typeof Community> = {};

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "free":
      filterQuery.price = "0";
      sortCriteria = { createdAt: -1 };
      break;
    case "paid":
      filterQuery.price = { $ne: "0" };
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCommunities = await Community.countDocuments(filterQuery);

    const communities = await Community.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalCommunities > skip + communities.length;

    return {
      success: true,
      data: { communities: JSON.parse(JSON.stringify(communities)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getCommunitiesByUser(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ communities: Community[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  console.log("inside getCommunitiesByUser action");
  const { page = 1, pageSize = 2, query, filter, id } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Community> = { admin: id };

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "free":
      filterQuery.price = "0";
      sortCriteria = { createdAt: -1 };
      break;
    case "paid":
      filterQuery.price = { $ne: "0" };
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCommunities = await Community.countDocuments(filterQuery);

    const communities = await Community.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalCommunities > skip + communities.length;

    return {
      success: true,
      data: { communities: JSON.parse(JSON.stringify(communities)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getAllCommunitiesByUser(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ communities: Community[]; isNext: boolean }>> {
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

  const filterQuery: FilterQuery<typeof Community> = {
    $or: [{ admin: id }, { secondaryAdmins: id }, { members: id }],
  };

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      // { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "free":
      filterQuery.price = "0";
      sortCriteria = { createdAt: -1 };
      break;
    case "paid":
      filterQuery.price = { $ne: "0" };
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCommunities = await Community.countDocuments(filterQuery);

    const communities = await Community.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalCommunities > skip + communities.length;

    return {
      success: true,
      data: { communities: JSON.parse(JSON.stringify(communities)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateCommunityMembers(
  params: UpdateCommunityMembersParams
): Promise<ActionResponse<Community>> {
  const validationResult = await action({
    params,
    schema: UpdateCommunityMembersSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { communityId, actions, memberId } = validationResult.params!;
  const userId = memberId;
  // GET USER ID FROM THE FRONT END NOT FROM THE SESSION.

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    if (actions === "add" && !community.members.includes(userId)) {
      community.members.push(userId);
    } else {
      console.log("User already a member");
    }

    if (actions === "remove" && community.members.includes(userId)) {
      community.members = community.members.filter(
        (member: mongoose.Types.ObjectId) => member.toString() !== userId
      );
    }

    if (actions === "remove" && community.secondaryAdmins.includes(userId)) {
      community.secondaryAdmins = community.secondaryAdmins.filter(
        (secondaryAdmin: mongoose.Types.ObjectId) =>
          secondaryAdmin.toString() !== userId
      );
    }

    if (actions === "upgrade" && !community.secondaryAdmins.includes(userId)) {
      community.secondaryAdmins.push(userId);
      community.members = community.members.filter(
        (member: mongoose.Types.ObjectId) => member.toString() !== userId
      );
    }

    if (actions === "downgrade" && community.secondaryAdmins.includes(userId)) {
      community.secondaryAdmins = community.secondaryAdmins.filter(
        (admin: mongoose.Types.ObjectId) => admin.toString() !== userId
      );
      community.members.push(userId);
    }

    await community.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(community)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function gradeCommunityMembers(
  params: GradeCommunityMembersParams
): Promise<ActionResponse<Community>> {
  const validationResult = await action({
    params,
    schema: GradeCommunityMembersSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { communityId, actions } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error("Community not found");
    }

    if (actions === "upgrade" && !community.secondaryAdmins.includes(userId)) {
      community.secondaryAdmins.push(userId);
      community.members = community.members.filter(
        (member: mongoose.Types.ObjectId) => member.toString() !== userId
      );
    } else {
      console.log("User already a member");
    }

    if (actions === "downgrade" && community.secondaryAdmins.includes(userId)) {
      community.secondaryAdmins = community.secondaryAdmins.filter(
        (admin: mongoose.Types.ObjectId) => admin.toString() !== userId
      );
      community.members.push(userId);
    }
    await community.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(community)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
