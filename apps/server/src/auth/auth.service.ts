import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "@/user/use.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string; id: string; username: string }> {
    const user = await this.usersService.findUserByUsername(username)
    if (user.password !== pass) {
      throw new UnauthorizedException()
    }
    const { password, ...result } = user
    // TODO: Generate a JWT and return it here
    const payload = { id: user.id, username: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
      ...result,
    }
  }

  async signUp(username: string, password: string): Promise<{ access_token: string; id: string; username: string }> {
    const existingUser = await this.usersService.findUserByUsername(username)
    if (existingUser) {
      throw new ForbiddenException("Username already exists")
    }

    await this.usersService.createUser(username, password)
    return await this.signIn(username, password)
  }

  async verify(session: string) {
    try {
      const payload = await this.jwtService.verifyAsync(session)
      return payload
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
