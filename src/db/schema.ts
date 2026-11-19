import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerToken: text("owmer_token").notNull().unique(),
  isDemo: boolean("is_demo").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .references(() => workspaces.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").default("").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status")
    .$type<"draft" | "published">()
    .default("draft")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
