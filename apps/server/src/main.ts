import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import cookieParser from "cookie-parser"
import fs from "node:fs"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync("../../cert/key.pem"),
      cert: fs.readFileSync("../../cert/cert.pem"),
    },
  })

  console.log(process.env)

  app.use(cookieParser())
  app.enableCors({
    origin: process.env.VITE_CLIENT_URL ?? "https://localhost:5173", // 前端地址
    credentials: true, // 允许携带cookie
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
