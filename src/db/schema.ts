import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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
