"use server";

import { auth } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export async function loginUser(data: LoginSchema) {
  try {
    // Validate the input data
    const validatedData = loginSchema.parse(data);

    // Use Better Auth to sign in the user
    const result = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    // Better Auth returns user data on success, no error property
    if (result && result.user) {
      return {
        success: {
          reason: "Login successful!",
        },
      };
    }

    return {
      error: {
        reason: "Login failed",
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: {
        reason: "An unexpected error occurred during login",
      },
    };
  }
}