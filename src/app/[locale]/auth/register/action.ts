"use server";

import { auth } from "@/lib/auth";
import { registerSchema, type RegisterSchema } from "@/lib/schemas";
import { db } from "@/db";
import { user } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function registerUser(data: RegisterSchema) {
  try {
    // Validate the input data
    const validatedData = registerSchema.parse(data);

    // Check if this is the first user (should become admin)
    const userCount = await db.select({ count: count() }).from(user);
    const isFirstUser = userCount[0]?.count === 0;

    // Use Better Auth to create the user
    const result = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
    });

    // Better Auth returns user data on success, no error property
    if (result && result.user) {
      // If this is the first user, make them admin
      if (isFirstUser) {
        await db
          .update(user)
          .set({ role: "admin" })
          .where(eq(user.id, result.user.id));
        
        console.log(`First user ${result.user.email} has been made admin`);
      }

      return {
        success: {
          reason: isFirstUser 
            ? "Registration successful! You have been granted admin privileges as the first user." 
            : "Registration successful!",
        },
      };
    }

    return {
      error: {
        reason: "Registration failed",
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: {
        reason: "An unexpected error occurred during registration",
      },
    };
  }
}