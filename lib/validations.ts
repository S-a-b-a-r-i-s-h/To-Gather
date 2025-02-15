// import mongoose from "mongoose";
import { z } from "zod";

// import { Community, User } from "@/database";

// import action from "./handlers/action";
// import handleError from "./handlers/error";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(15, { message: "Password must be at most 15 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(15, { message: "Password must be at most 15 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const CreateCommunitySchema = z.object({
  image: z.string(),
  title: z
    .string()
    .min(5, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  description: z
    .string()
    .min(20, { message: "Describe at least in 20 characters" })
    .max(1000, { message: "Description cannot exceed 500 characters." }),
  shortDescription: z
    .string()
    .min(10, { message: "Short Description is required." })
    .max(100, { message: "Short Description cannot exceed 100 characters." }),
  price: z.string().min(0, { message: "Price cannot be negative." }),
  linkedin: z.string().optional(),
  x: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().optional(),
});

// export const DynamicFieldSchema = z.object({
//   name: z.string().optional(),
//   label: z.string().optional(),
//   type: z.enum(["text", "number", "select", "textarea"]).optional(),
//   options: z.array(z.string()).optional(),
//   value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
// });

export const DynamicFieldSchema = z
  .object({
    name: z.string().nonempty({ message: "Field name is required." }),
    label: z.string().nonempty({ message: "Field label is required." }),
    type: z.enum(["text", "number", "select", "textarea"], {
      message: "Invalid field type.",
    }),
    options: z
      .array(z.string())
      .optional()
      .refine((opts) => Array.isArray(opts) && opts.length > 0, {
        message: "Options must be provided for select type.",
        path: ["options"],
      })
      .or(z.undefined()),
    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
  })
  .refine(
    (data) => {
      // Require options only when type is "select"
      if (data.type === "select") {
        return !!data.options && data.options.length > 0;
      }
      return true;
    },
    {
      message: "Options are required for 'select' type fields.",
      path: ["options"],
    }
  );

export const ParticipantSchema = z.object({
  id: z.string(), // Use z.instanceof(ObjectId) if working with MongoDB ObjectIds
  dynamicFields: z.array(DynamicFieldSchema).optional(),
});

export const GroupDetailsSchema = z.object({
  name: z.string().optional(),
  members: z.array(z.string()).optional(),
});
export const dummySchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters long." }),
    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters long." }),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative value." }),
    imageUrl: z.string(),
    date: z.date().min(new Date(), { message: "Date must be in the future." }),
    type: z.enum(["individual", "group"]),
    teamSize: z.number().optional(),
    label: z.string().optional(),
    inputType: z.enum(["text", "number", "select", "textarea"]).optional(),
    options: z.string().optional(),
    dynamicFields: z
      .array(
        z.object({
          namelabel: z.string().optional(),
          label: z.string().optional(),
          type: z.enum(["text", "number", "select", "textarea"]).optional(),
          options: z.array(z.string()).optional(),
          value: z
            .union([z.string(), z.number(), z.array(z.string())])
            .optional(),
        })
      )
      .optional()
      .default([]),
    participants: z
      .array(
        z.object({
          id: z.string().optional(),
          dynamicFields: z
            .array(
              z.object({
                namelabel: z.string().optional(),
                label: z.string().optional(),
                type: z
                  .enum(["text", "number", "select", "textarea"])
                  .optional(),
                options: z.array(z.string()).optional(),
                value: z
                  .union([z.string(), z.number(), z.array(z.string())])
                  .optional(),
              })
            )
            .optional()
            .default([]),
        })
      )
      .optional()
      .default([]),
    communityId: z.string().min(1, { message: "Community ID is required." }),
    createdBy: z.string().min(1, { message: "Creator ID is required." }),
    groupDetails: z
      .array(
        z.object({
          name: z.string().optional(),
          members: z.array(z.string()).optional(),
        })
      )
      .optional()
      .default([]),
  })
  .refine(
    (data) => {
      if (data.type === "group") {
        return data.teamSize;
      }
      return true;
    },
    {
      message: "Team size is required for group events",
      path: ["teamSize"],
    }
  );

export const UpdateEventParticipantsSchema = z.object({
  eventId: z.string(),
  participantId: z.string(),
  datadynamicFields: z
    .array(
      z.object({
        namelabel: z.string().optional(),
        label: z.string().optional(),
        type: z.enum(["text", "number", "select", "textarea"]).optional(),
        options: z.array(z.string()).optional(),
        value: z
          .union([z.string(), z.number(), z.array(z.string())]).optional()
      })
    )
    .optional()
    .default([]),
    newGroup: z.object({
      name: z.string().optional(),
      members: z.array(z.string()).optional(),
    }),
    groupAction: z.enum(["create", "join"]).optional(),
});

export const ApplyEventSchema = z.object({
  dynamicFields: z
    .array(
      z.object({
        namelabel: z.string().optional(),
        label: z.string().optional(),
        type: z.enum(["text", "number", "select", "textarea"]).optional(),
        options: z.array(z.string()).optional(),
        value: z
          .union([z.string(), z.number(), z.array(z.string())])
          .optional(),
      })
    )
    .optional()
    .default([]),
  participants: z
    .array(
      z.object({
        participantId: z.string().optional(),
        dynamicFields: z
          .array(
            z.object({
              namelabel: z.string().optional(),
              label: z.string().optional(),
              type: z.enum(["text", "number", "select", "textarea"]).optional(),
              options: z.array(z.string()).optional(),
              value: z
                .union([z.string(), z.number(), z.array(z.string())])
                .optional(),
            })
          )
          .optional()
          .default([]),
      })
    )
    .optional()
    .default([]),
    groupDetails: z
      .array(
        z.object({
          name: z.string().optional(),
          members: z.array(z.string()).optional(),
        })
      )
      .optional()
      .default([]),
      groupAction: z.enum(["create", "join"]).optional(),    
});
// export const CreateEventSchema = z
//   .object({
//     title: z
//       .string()
//       .min(5, { message: "Title must be at least 5 characters long." }),
//     description: z
//       .string()
//       .min(20, { message: "Description must be at least 20 characters long." }),
//     // image: z.string().min(1, { message: "Image is required." }),
//     date: z.date().min(new Date(), { message: "Date must be in the future." }),
//     price: z
//       .number()
//       .min(0, { message: "Price must be a non-negative value." }),
//     type: z.enum(["individual", "group"]),
//     teamSize: z.number().min(1, "Team size must be at least 1").optional(),
//     participants: z.array(ParticipantSchema).optional(),
//     communityId: z.string().min(1, { message: "Community ID is required." }),
//     createdBy: z.string().min(1, { message: "Creator ID is required." }),
//     groupDetails: GroupDetailsSchema.optional(),
//   })
//   .refine(
//     (data) => {
//       // Validate `teamSize` only if the event type is `group`
//       if (
//         data.type === "group" &&
//         (data.teamSize === undefined || data.teamSize <= 0)
//       ) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "Team size is required for group events",
//       path: ["teamSize"], // Path to the field that caused the error
//     }
//   );

// export async function createCommunity(
//   params: CreateCommunityParams
// ): Promise<ActionResponse<Community>> {
//   const validationResult = await action({
//     params,
//     schema: CreateCommunitySchema,
//     authorize: true,
//   });

//   if (validationResult instanceof Error) {
//     return handleError(validationResult) as ErrorResponse;
//   }

//   const {
//     title,
//     description,
//     shortDescription,
//     image,
//     price,
//     linkedin,
//     x,
//     github,
//     instagram,
//     whatsapp,
//     website,
//   } = validationResult.params!;
//   const userId = validationResult?.session?.user?.id;

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const [community] = await Community.create(
//       [
//         {
//           title,
//           description,
//           shortDescription,
//           img: image,
//           price,
//           admin: userId,
//           linkedin,
//           x,
//           github,
//           instagram,
//           whatsapp,
//           website,
//         },
//       ],
//       { session }
//     );
//     if (!community) {
//       throw new Error("Failed to create Community");
//     }

//     // Now update the user with the new community

//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     user.communities.push(community._id);
//     await user.save({ session });

//     await session.commitTransaction();
//     return { success: true, data: JSON.parse(JSON.stringify(community)) };
//   } catch (error) {
//     await session.abortTransaction();
//     return handleError(error) as ErrorResponse;
//   } finally {
//     session.endSession();
//   }
// }

export const GetEventSchema = z.object({
  eventId: z.string(),
});

export const EditCommunitySchema = CreateCommunitySchema.extend({
  communityId: z.string().min(1, { message: "Community ID is required." }),
});

export const UpdateCommunityMembersSchema = z.object({
  communityId: z.string().min(1, { message: "Community ID is required." }),
  // userId: z.string().min(1, { message: "User ID is required." }),
  actions: z.enum(["add", "remove", "upgrade", "downgrade"]),
  memberId: z.string().optional()
});

export const GetUserSchema = z.object({
  userId: z.string(),
});

export const EditUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().optional(),
  image: z.string().optional(),
  userLocation: z.string().optional(),
  portfolio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
})

export const EditUserSchemaById = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().optional(),
  image: z.string().optional(),
  userLocation: z.string().optional(),
  portfolio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export const GradeCommunityMembersSchema = z.object({
  communityId: z.string().min(1, { message: "Community ID is required." }),
  // userId: z.string().min(1, { message: "User ID is required." }),
  actions: z.enum(["upgrade", "downgrade"]),
});

export const GetCommunitySchema = z.object({
  communityId: z.string().min(1, { message: "Community ID is required." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().optional(),
  image: z.string().min(1, { message: "Image is required." }),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(),
  github: z.string().url({ message: "Please provide a valid URL." }).optional(),
  linkedin: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(),
  communities: z.array(z.string()).optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().min(1, { message: "Image is required." }),
  // image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z.string().url("Invalid image URL").optional(),
  }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
  id: z.string().optional(),
});
