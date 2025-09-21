import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './use.service';

@Module({
    controllers: [UsersController],
    providers: [UserService],
})
export class UsersModule { }