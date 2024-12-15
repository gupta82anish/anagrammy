import { integer, pgTable } from "drizzle-orm/pg-core";

export const anagram = pgTable("anagram", {
    id: integer("id").primaryKey(),
})