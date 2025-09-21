
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './use.service';

@Controller('user')
export class UsersController {
    constructor(private userService: UserService) { }
    // dynamic parameter
    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto.username, createUserDto.password);
    }
}
