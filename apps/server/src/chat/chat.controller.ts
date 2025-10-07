import { Body, Controller, Get, Post, Req } from "@nestjs/common"
import { ChatService } from "./chat.service"
import type { Request } from "express"

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("/list")
  async listChat(@Req() req: Request) {
    const userId = req["session"]?.id ?? ""
    return this.chatService.listChat(userId)
  }

  @Post("/create")
  async createChat(@Body() { title }: { title: string }, @Req() req: Request) {
    const userId = req["session"]?.id ?? ""
    return this.chatService.createChat(userId, title)
  }
}
