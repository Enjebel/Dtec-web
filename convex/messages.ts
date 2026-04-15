import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

/**
 * FETCH ALL MESSAGES
 * Used by the Admin Inbox to display transmissions.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").collect();
  },
});

/**
 * COUNT UNREAD MESSAGES
 * Used for the dashboard badge and status alerts.
 */
export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const unread = await ctx.db
      .query("messages")
      .withIndex("by_status", (q) => q.eq("isRead", false))
      .collect();
    
    return unread.length;
  },
});

/**
 * SUBMIT NEW MESSAGE
 * Allows the public contact form to save data to the database.
 */
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      message: args.message,
      isRead: false,
    });
    return messageId;
  },
});

/**
 * MARK AS READ
 * Logic for when an admin opens a message.
 */
export const markAsRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isRead: true });
  },
});

/**
 * REMOVE MESSAGE
 * ADDED: Fixes the 'remove' mismatch in MessagesPanel.tsx
 */
export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    // Optional: Check if user is admin before deleting
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user?.role !== "admin") {
      throw new ConvexError("Only admins can delete messages.");
    }

    await ctx.db.delete(args.id);
    return true;
  },
});