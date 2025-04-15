"use server";

// import { Gift } from "lucide-react";
import mongoose, { FilterQuery } from "mongoose";

import { User } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { EditUserSchemaById, GetUserSchema, PaginatedSearchParamsSchema } from "../validations";

export async function getUsers(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ users: User[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  // const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof User> = {};

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
    const totalUsers = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
    .sort(sortCriteria)

    const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: { users: JSON.parse(JSON.stringify(users)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserById(
  params: GetUserParams
): Promise<ActionResponse<User>> {
  //   console.log(params);
  const validationResult = await action({
    params,
    schema: GetUserSchema,
    authorize: true,
  });
  console.log("Inside getUserById")
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Failed to fetch User Details");
    }

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function editUser(
  params: EditUserParamsById
): Promise<ActionResponse<User>> {
  console.log(params, "params");
  const validationResult = await action({
    params,
    schema: EditUserSchemaById,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    console.error("Validation Error Details:", validationResult);
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    userId,
    name,
    username,
    email,
    image,
    bio,
    userLocation,
    portfolio,
    github,
    linkedin,
  } = validationResult.params!;
  // const userId = validationResult?.session?.user?.id;

  console.log(
    userId,
    name,
    username,
    email,
    image,
    bio,
    userLocation,
    portfolio,
    github,
    linkedin
  );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    //   if (community.admin.toString() !== userId) {
    //     throw new Error("Unauthorized");
    //   }
    if (user.name !== name) {
      user.name = name;
      await user.save({ session });
    }
    if (user.username !== username) {
      user.username = username;
      await user.save({ session });
    }
    if (user.email !== email) {
      user.email = email;
      await user.save({ session });
    }
    if (user.image !== image) {
      user.image = image;
      await user.save({ session });
    }
    if (user.bio !== bio) {
      user.bio = bio;
      await user.save({ session });
    }
    if (user.userLocation !== userLocation) {
      user.userLocation = userLocation;
      await user.save({ session });
    }
    if (user.portfolio !== portfolio) {
      user.portfolio = portfolio;
      await user.save({ session });
    }
    if (user.github !== github) {
      user.github = github;
      await user.save({ session });
    }
    if (user.linkedin !== linkedin) {
      user.linkedin = linkedin;
      await user.save({ session });
    }

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
