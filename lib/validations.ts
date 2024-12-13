import { z } from "zod"

export const SignInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(15, { message: "Password must be at most 15 characters." }),
})

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
  
    description: z.string().min(20, { message: "Describe at least in 20 characters" }).max(1000, { message: "Description cannot exceed 500 characters." }),
    price: z.string().min(0, { message: "Price cannot be negative." }),
  });

export const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    email: z.string().email("Please enter a valid email address."),
    bio: z.string().optional(),
    image: z.string().min(1, { message: "Image is required." }),
    location: z.string().optional(),
    portfolio: z.string().url({ message: "Please provide a valid URL." }).optional(),
    github: z.string().url({ message: "Please provide a valid URL." }).optional(),
    linkedin: z.string().url({ message: "Please provide a valid URL." }).optional(),
    communities: z.array(z.string()).optional(),
})

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