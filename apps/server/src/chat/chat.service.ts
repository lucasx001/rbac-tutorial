import { Injectable, StreamableFile } from "@nestjs/common"
import { db, eq, schema } from "@repo/db"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Readable, Writable } from "stream"
import { systemPrompt } from "@repo/shared"

@Injectable()
export class ChatService {
  async listChat(userId: string) {
    return db.select().from(schema.chatTable).where(eq(schema.chatTable.userId, userId))
  }

  async createChat(userId: string, title: string) {
    const [data] = await db.insert(schema.chatTable).values({ userId, title }).returning()

    return data
  }

  async promptChat(userId: string, prompt: string, chatId?: string): Promise<StreamableFile> {
    // 调用 vercel ai sdk 获取流
    const result = streamText({
      model: openai("gpt-4o"),
      prompt,
      system: systemPrompt,
    })

    const [clientStream, serverStream] = result.textStream.tee()

    if (!chatId) {
      const chat = await this.createChat(userId, prompt)
      chatId = chat.id
    }

    this.saveStreamToDatabase(this.convertWebToNodeStream(serverStream), chatId)

    // Vercel SDK 返回的是 Web ReadableStream
    // 需要转换为 Node.js 的 Readable
    const nodeReadable = this.convertWebToNodeStream(clientStream)

    // 返回 NestJS 的 StreamableFile
    return new StreamableFile(nodeReadable, {
      type: "text/plain; charset=utf-8",
    })
  }

  private convertWebToNodeStream(webStream: ReadableStream): Readable {
    const reader = webStream.getReader()
    return new Readable({
      async read() {
        const { done, value } = await reader.read()
        if (done) this.push(null)
        else this.push(Buffer.from(value))
      },
    })
  }

  private async saveStreamToDatabase(stream: Readable, chatId: string) {
    const decoder = new TextDecoder()
    let text = ""
    let chatMessageId = ""

    stream.pipe(
      new Writable({
        async write(chunk, encoding, callback) {
          try {
            text += decoder.decode(chunk, { stream: true })
            if (!chatMessageId) {
              db.insert(schema.chatMessageTable)
                .values({
                  chatId,
                  content: text,
                  role: "assistant",
                })
                .returning()
                .then(([data]) => {
                  chatMessageId = data.id
                  callback()
                })
                .catch(() => callback())
            } else {
              console.log("update chat message", text)
              db.update(schema.chatMessageTable)
                .set({
                  content: text,
                })
                .where(eq(schema.chatMessageTable.id, chatMessageId))
                .then(() => callback())
                .catch(() => callback())
            }
          } catch (error) {
            callback(error)
          }
        },
      })
    )
  }
}
