// db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; // 你定义的表

// 创建连接池
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 初始化 Drizzle client
export const db = drizzle(pool, { schema });

// export type DrizzleClient = typeof db
export { schema }
export * from "drizzle-orm"