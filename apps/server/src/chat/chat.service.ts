import { Injectable } from "@nestjs/common"
import { db, eq, schema } from "@repo/db"

@Injectable()
export class ChatService {
  async listChat(userId: string) {
    return db.select().from(schema.chatTable).where(eq(schema.chatTable.userId, userId))
  }

  async createChat(userId: string, title: string) {
    const [data] = await db.insert(schema.chatTable).values({ userId, title }).returning()

    return data
  }
}
