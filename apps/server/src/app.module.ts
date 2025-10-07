import { Module } from "@nestjs/common"
import { UsersModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { ChatController } from "./chat/chat.controller"
import { ChatService } from "./chat/chat.service"
import { ChatModule } from "./chat/chat.module"
import { APP_GUARD } from "@nestjs/core"
import { AuthGuard } from "./auth/auth.guard"

@Module({
  imports: [UsersModule, AuthModule, ChatModule],
  controllers: [ChatController],
  providers: [ChatService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
