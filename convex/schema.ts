import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(), 
    role: v.union(v.literal("admin"), v.literal("user")),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_role", ["role"]),

  sectors: defineTable({
    key: v.string(),
    title: v.string(),
    tag: v.string(),
    desc: v.string(),
    emoji: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    keywords: v.optional(v.string()),
    order: v.number(),
    sections: v.array(
      v.object({
        label: v.string(),
        items: v.array(v.string()),
      })
    ),
  })
    .index("by_key", ["key"])
    .index("by_order", ["order"]),

  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    _creationTime: v.optional(v.number()), // Built-in for sorting, but good to keep in mind
  })
    // Matches the query call in messages.ts perfectly now
    .index("by_status", ["isRead"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(), // Changed to 'any' to allow for complex setting objects (colors, SEO strings)
  })
    .index("by_key", ["key"]),
});