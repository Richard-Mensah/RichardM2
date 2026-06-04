import { integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const collaborationInquiries = pgTable("collaboration_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 180 }),
  collaborationType: varchar("collaboration_type", { length: 120 }).notNull(),
  focusArea: varchar("focus_area", { length: 140 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CollaborationInquiry = typeof collaborationInquiries.$inferSelect;
export type NewCollaborationInquiry = typeof collaborationInquiries.$inferInsert;

export const impactStats = pgTable("impact_stats", {
  id: serial("id").primaryKey(),
  position: integer("position").notNull().default(0),
  value: varchar("value", { length: 64 }).notNull(),
  label: varchar("label", { length: 255 }).notNull(),
  detail: text("detail").notNull().default(""),
});

export type ImpactStatRow = typeof impactStats.$inferSelect;
export type NewImpactStatRow = typeof impactStats.$inferInsert;

// Key/value store for singleton editable content (author bio, homepage copy).
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 120 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  position: integer("position").notNull().default(0),
  name: varchar("name", { length: 160 }).notNull(),
  role: varchar("role", { length: 200 }).notNull().default(""),
  quote: text("quote").notNull(),
  initials: varchar("initials", { length: 8 }).notNull().default(""),
  accent: varchar("accent", { length: 16 }).notNull().default("#4f8bff"),
});

export type TestimonialRow = typeof testimonials.$inferSelect;

export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  position: integer("position").notNull().default(0),
  slug: varchar("slug", { length: 80 }).notNull().default(""),
  title: varchar("title", { length: 200 }).notNull(),
  type: varchar("type", { length: 80 }).notNull().default(""),
  description: text("description").notNull().default(""),
  link: text("link").notNull().default(""),
  accent: varchar("accent", { length: 16 }).notNull().default("#4f8bff"),
});

export type OpportunityRow = typeof opportunities.$inferSelect;

export const galleryPhotos = pgTable("gallery_photos", {
  id: serial("id").primaryKey(),
  position: integer("position").notNull().default(0),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 300 }).notNull().default(""),
  caption: varchar("caption", { length: 300 }).notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type GalleryPhotoRow = typeof galleryPhotos.$inferSelect;

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: varchar("path", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }).notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
