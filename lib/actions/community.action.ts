"use server";

import mongoose, { FilterQuery } from "mongoose";

import Community from "@/database/community.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CreateCommunitySchema,
  EditCommunitySchema,
  GetCommunitySchema,
  PaginatedSearchParamsSchema,
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

  const { title, description, image, price } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [community] = await Community.create(
      [{ title, description, img: image, price, admin: userId }],
      { session }
    );
    if (!community) {
      throw new Error("Failed to create Community");
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

  const { title, description, image, price, communityId } =
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
    const community = await Community.findById(communityId);

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