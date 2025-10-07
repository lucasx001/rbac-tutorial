import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2" // cuid 生成函数
import { sql } from "drizzle-orm"
export const usersTable = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().default(createId()),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
})

export const chatTable = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(), // 聊天标题（可自动生成，比如「新对话」）
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
})

export const chatMessageTable = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull(),
  content: text("content").notNull(), // 消息内容
  role: varchar("role", { length: 255 }).notNull(), // 消息角色（user/assistant）
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chatTable.id, { onDelete: "cascade" }),
})
