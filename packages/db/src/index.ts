// db.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema" // 你定义的表
import * as dotenv from "dotenv"
import { resolve } from "node:path"

dotenv.config({ path: resolve(__dirname, "../../../.env.local") })

// 创建连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
})

// 初始化 Drizzle client
export const db = drizzle(pool, { schema })

// export type DrizzleClient = typeof db
export { schema }
export * from "drizzle-orm"
