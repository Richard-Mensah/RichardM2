import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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
