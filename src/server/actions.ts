"use server";

import { getDbAsync } from "@/lib/db";
import {
  getTodayISOString,
  hashSecret,
  verifySecret,
} from "@/lib/streak-utils";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { users, type NewUser } from "../../schemas/drizzle";

export type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Create a new user
 */
export async function createUser(
  formData: FormData
): Promise<ActionResult<{ username: string }>> {
  try {
    const rawUsername = formData.get("username")?.toString().trim();
    const name = formData.get("name")?.toString().trim();
    const secret = formData.get("secret")?.toString();

    if (!rawUsername || !name || !secret) {
      return { success: false, error: "All fields are required" };
    }

    // Convert username to lowercase and validate
    const username = rawUsername.toLowerCase();

    // Validate username format
    if (!/^[a-z0-9_-]+$/.test(username)) {
      return {
        success: false,
        error:
          "Username can only contain lowercase letters, numbers, dashes, and underscores",
      };
    }

    if (username.length < 3) {
      return {
        success: false,
        error: "Username must be at least 3 characters",
      };
    }

    if (username.length > 20) {
      return {
        success: false,
        error: "Username must be less than 20 characters",
      };
    }

    if (secret.length < 5) {
      return { success: false, error: "Secret must be at least 6 characters" };
    }

    // Check if username already exists
    const db = await getDbAsync();
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser.length > 0) {
      return { success: false, error: "Username already exists" };
    }

    // Hash the secret
    const hashedSecret = await hashSecret(secret);

    // Create new user
    const newUser: NewUser = {
      username,
      name,
      streakStartDate: getTodayISOString(),
      secret: hashedSecret,
    };

    await db.insert(users).values(newUser);

    return { success: true, data: { username } };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

/**
 * Get user by username
 */
export async function getUserByUsername(username: string): Promise<
  ActionResult<{
    user: {
      id: number;
      username: string;
      name: string;
      streakStartDate: string;
      createdAt: string;
    };
  }>
> {
  try {
    if (!username) {
      return { success: false, error: "Username is required" };
    }

    // Convert username to lowercase for consistent lookup
    const normalizedUsername = username.toLowerCase();

    // Validate username format
    if (!/^[a-z0-9_-]+$/.test(normalizedUsername)) {
      return { success: false, error: "Invalid username format" };
    }

    const db = await getDbAsync();
    const result = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        streakStartDate: users.streakStartDate,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.username, normalizedUsername));

    if (result.length === 0) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: { user: result[0] } };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

/**
 * Reset user's streak
 */
export async function resetStreak(
  formData: FormData
): Promise<ActionResult<{ message: string }>> {
  try {
    const rawUsername = formData.get("username")?.toString();
    const resetDate = formData.get("resetDate")?.toString();
    const secret = formData.get("secret")?.toString();

    if (!rawUsername || !secret) {
      return { success: false, error: "Username and secret are required" };
    }

    // Convert username to lowercase for consistent lookup
    const username = rawUsername.toLowerCase();

    // Validate username format
    if (!/^[a-z0-9_-]+$/.test(username)) {
      return { success: false, error: "Invalid username format" };
    }

    const db = await getDbAsync();

    // Get user with secret
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (userResult.length === 0) {
      return { success: false, error: "User not found" };
    }

    const user = userResult[0];

    // Verify secret
    const isValidSecret = await verifySecret(secret, user.secret);
    if (!isValidSecret) {
      return { success: false, error: "Invalid secret" };
    }

    // Check if resetDate is not a future date
    if (resetDate) {
      const resetDateTime = new Date(resetDate).getTime();
      const todayTime = new Date(getTodayISOString()).getTime();

      if (resetDateTime > todayTime) {
        return { success: false, error: "Reset date cannot be in the future" };
      }
    }

    // Reset streak
    const today = resetDate || getTodayISOString();

    await db
      .update(users)
      .set({
        streakStartDate: today,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, user.id));

    // Revalidate the user page
    revalidatePath(`/${username}`);

    return { success: true, data: { message: "Streak reset successfully" } };
  } catch (error) {
    console.error("Error resetting streak:", error);
    return { success: false, error: "Failed to reset streak" };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  formData: FormData
): Promise<ActionResult<{ message: string }>> {
  try {
    const rawUsername = formData.get("username")?.toString();
    const newName = formData.get("name")?.toString().trim();
    const secret = formData.get("secret")?.toString();

    if (!rawUsername || !newName || !secret) {
      return { success: false, error: "All fields are required" };
    }

    // Convert username to lowercase for consistent lookup
    const username = rawUsername.toLowerCase();

    // Validate username format
    if (!/^[a-z0-9_-]+$/.test(username)) {
      return { success: false, error: "Invalid username format" };
    }

    const db = await getDbAsync();

    // Get user with secret
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (userResult.length === 0) {
      return { success: false, error: "User not found" };
    }

    const user = userResult[0];

    // Verify secret
    const isValidSecret = await verifySecret(secret, user.secret);
    if (!isValidSecret) {
      return { success: false, error: "Invalid secret" };
    }

    // Update profile
    await db
      .update(users)
      .set({
        name: newName,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, user.id));

    // Revalidate the user page
    revalidatePath(`/${username}`);

    return { success: true, data: { message: "Profile updated successfully" } };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

/**
 * Get leaderboard data with streak calculations
 */
export async function getLeaderboard(limit: number = 50): Promise<
  ActionResult<{
    users: Array<{
      username: string;
      name: string;
      streakDays: number;
      streakStartDate: string;
      rank: number;
    }>;
  }>
> {
  try {
    // Ensure limit is reasonable
    const safeLimit = Math.min(Math.max(1, limit), 1000); // Between 1 and 1000

    const db = await getDbAsync();
    const result = await db
      .select({
        username: users.username,
        name: users.name,
        streakStartDate: users.streakStartDate,
      })
      .from(users)
      .orderBy(users.streakStartDate) // Order by streak start date (older dates = longer streaks)
      .limit(safeLimit * 2); // Fetch extra to account for sorting by calculated streak days

    // Calculate streak days and add ranking
    const today = new Date(getTodayISOString());
    const usersWithStreaks = result.map((user) => {
      const streakStart = new Date(user.streakStartDate);
      const diffTime = today.getTime() - streakStart.getTime();
      const streakDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...user,
        streakDays: Math.max(0, streakDays), // Ensure non-negative
      };
    });

    // Sort by streak days in descending order, limit results, and add rank
    const sortedUsers = usersWithStreaks
      .sort((a, b) => b.streakDays - a.streakDays)
      .slice(0, safeLimit)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

    return { success: true, data: { users: sortedUsers } };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, error: "Failed to fetch leaderboard" };
  }
}
