import * as dotenv from "dotenv"
import path from "node:path"
import { defineConfig } from 'drizzle-kit';
// 指定路径（从 db 相对到仓库根目录）
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })

export default defineConfig({
    out: './drizzle',
    schema: './src/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
