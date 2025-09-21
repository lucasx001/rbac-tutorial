import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";  // cuid 生成函数
export const usersTable = pgTable("users", {
    id: varchar("id", { length: 36 }).primaryKey().default(createId()),
    username: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
});
