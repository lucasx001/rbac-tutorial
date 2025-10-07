"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageTable = exports.chatTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const cuid2_1 = require("@paralleldrive/cuid2"); // cuid 生成函数
const drizzle_orm_1 = require("drizzle-orm");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id", { length: 36 }).primaryKey().default((0, cuid2_1.createId)()),
    username: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
});
exports.chatTable = (0, pg_core_1.pgTable)("chats", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(), // 聊天标题（可自动生成，比如「新对话」）
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `now()`)
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `now()`)
        .notNull(),
    userId: (0, pg_core_1.varchar)("user_id", { length: 36 })
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
});
exports.chatMessageTable = (0, pg_core_1.pgTable)("chat_messages", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `now()`)
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `now()`)
        .notNull(),
    content: (0, pg_core_1.text)("content").notNull(), // 消息内容
    role: (0, pg_core_1.varchar)("role", { length: 255 }).notNull(), // 消息角色（user/assistant）
    chatId: (0, pg_core_1.uuid)("chat_id")
        .notNull()
        .references(() => exports.chatTable.id, { onDelete: "cascade" }),
});
//# sourceMappingURL=schema.js.map