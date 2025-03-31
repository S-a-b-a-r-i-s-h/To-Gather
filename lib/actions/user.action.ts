"use server";

// import { Gift } from "lucide-react";
import mongoose from "mongoose";

import { User } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { EditUserSchemaById, GetUserSchema } from "../validations";

export async function getUserById(
  params: GetUserParams
): Promise<ActionResponse<User>> {
  //   console.log(params);
  const validationResult = await action({
    params,
    schema: GetUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the event
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
