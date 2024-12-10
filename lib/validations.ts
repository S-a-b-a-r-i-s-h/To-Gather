import { z } from "zod"

export const signInSchema = z.object({
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