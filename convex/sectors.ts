
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * List all sectors. 
 * Fallback: If the database is empty, it returns the hardcoded DTEC sectors.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const dbSectors = await ctx.db
      .query("sectors")
      .withIndex("by_order")
      .collect();

    if (dbSectors.length > 0) {
      return dbSectors;
    }

    // Fallback data if DB is empty
    return [
      {
        key: "academy",
        title: "DIIMATS Academy",
        tag: "Diverse Career Pathways",
        desc: "Our elite training wing covering AutoCAD, Software Engineering, and UI/UX Design.",
        emoji: "🎓",
        order: 1,
        sections: [
          { label: "AutoCAD (16 Modules)", items: ["Intro to Interface", "Tool Mastery", "1-4 Bedroom Bungalows", "Roof & Elevations", "Section Drawings", "Duplex Execution", "Plotting & Certification"] },
          { label: "Software Development", items: ["Frontend (React/Vite)", "Backend (Node/Express)", "Database (MongoDB)", "API Integration", "Mobile Apps (PWA/Native)", "Deployment & DevOps"] },
          { label: "UI/UX Design", items: ["Graphics Designing & Web Development", "Digital Marketing & Entrepreneurship", "Computer Maintenance & Graphics Designing"] }
        ]
      },
      {
        key: "architecture",
        title: "Architecture & construction",
        tag: "Structural Excellence",
        desc: "Precision structural modeling and building services in Douala.",
        emoji: "🏗️",
        order: 2,
        sections: [
          { label: "Structural Design", items: ["3D Architectural Plans", "BIM Modeling", "Structural Analysis", "Site Supervision"] },
          { label: "Civil Engineering", items: ["Foundation & Masonry", "Reinforced Concrete", "Roofing Systems"] }
        ]
      },
      {
        key: "software",
        title: "Software Dev",
        tag: "Full-Stack Engineering",
        desc: "Engineering high-performance web and mobile solutions using the MERN stack.",
        emoji: "💻",
        order: 3,
        sections: [
          { label: "Development Tiers", items: ["MERN Stack Web Apps", "React Native Mobile Apps", "Progressive Web Apps (PWA)"] },
          { label: "Technical Operations", items: ["Cloud Hosting", "Database Optimization", "CI/CD Deployment"] }
        ]
      },
      {
        key: "farming",
        title: "DTEC Farming",
        tag: "Agri-Automation",
        desc: "Smart solutions for the modern Cameroonian farmer.",
        emoji: "🌱",
        order: 4,
        sections: [
          { label: "Smart Irrigation", items: ["Soil Moisture Sensors", "Solar-Powered Pumps"] },
          { label: "Poultry Automation", items: ["Climate Control Systems", "Automated Feeding"] }
        ]
      },
      {
        key: "printing",
        title: "Printing Press",
        tag: "Corporate Branding",
        desc: "High-volume printing and branding solutions.",
        emoji: "🖨️",
        order: 5,
        sections: [
          { label: "Offset & Digital Press", items: ["High-Volume Books", "Brochures & Flyers", "Business Stationery"] },
          { label: "Corporate Branding", items: ["Logo Design", "Uniform Branding", "Signage & Billboards"] }
        ]
      },
      {
        key: "realestate",
        title: "Real Estate",
        tag: "Smart Infrastructure",
        desc: "Developing and managing residential and industrial properties across Douala.",
        emoji: "🏠",
        order: 6,
        sections: [
          { label: "Property Development", items: ["Smart Student Housing", "Industrial Flex Spaces"] }
        ]
      }
    ];
  },
});

/**
 * Upsert: Updates an existing sector by key or inserts a new one.
 */
export const upsert = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("sectors")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("sectors", args);
    }
  },
});

/**
 * Remove: Deletes a sector using its unique key.
 */
export const remove = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("sectors")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (!existing) throw new Error("Sector not found");

    await ctx.db.delete(existing._id);
  },
});