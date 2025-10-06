import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateUserDto } from "@repo/shared"
import { UsersService } from "./use.service"

@Controller("user")
export class UsersController {
  constructor(private userService: UsersService) {}
  // dynamic parameter
  @Get(":id")
  async find(@Param("id") id: string) {
    return await this.userService.findUserById(id)
  }

  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto.username, createUserDto.password)
  }
}
