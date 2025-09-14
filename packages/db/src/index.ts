import * as dotenv from "dotenv"
import { drizzle } from 'drizzle-orm/node-postgres';
import path from "node:path"
// 指定路径（从 db 相对到仓库根目录）
dotenv.config({ path: path.resolve(__dirname, "../../../.env.local") })

export const db = drizzle(process.env.DATABASE_URL!);
