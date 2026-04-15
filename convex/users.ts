import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

/**
 * Get current authenticated user details based on Clerk Identity.
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
  },
});

/**
 * Check if the current user has administrative privileges.
 * FIXED: Empty args to match the frontend call.
 */
export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    return user?.role === "admin";
  },
});

/**
 * List all users for the Admin Panel.
 */
export const listAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user?.role !== "admin") return [];

    return await ctx.db.query("users").collect();
  },
});

/**
 * Sync Clerk user data with the Convex database.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user._id, {
        name: identity.name,
        email: identity.email,
        image: identity.pictureUrl,
      });
      return user._id;
    }

    // First user to sign in becomes admin automatically
    const anyUser = await ctx.db.query("users").first();
    
    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "no-email",
      image: identity.pictureUrl,
      role: anyUser ? "user" : "admin",
    });
  },
});

/**
 * Bootstrap logic: Claim master admin role if none exists.
 */
export const makeFirstAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const anyAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();

    if (anyAdmin) {
      throw new ConvexError("An admin already exists.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, { role: "admin" });
    }
    return true;
  },
});