import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateAuthDto } from "@repo/shared"
import type { CookieOptions, Response } from "express"
import { Cookies } from "@/decorators/cookies"
import { Public } from "@/decorators/is_public"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  private setCookieOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 10,
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @Public()
  async signIn(@Body() signInDto: CreateAuthDto, @Res() res: Response) {
    const { access_token, id, username } = await this.authService.signIn(signInDto.username, signInDto.password)
    res.cookie("session", access_token, this.setCookieOption)

    return res.json({ access_token, id, username })
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("sign-up")
  @Public()
  async signUp(@Body() signUpDto: CreateAuthDto, @Res() res: Response) {
    const { access_token, id, username } = await this.authService.signUp(signUpDto.username, signUpDto.password)

    res.cookie("session", access_token, this.setCookieOption)

    return res.json({ access_token, id, username })
  }

  @Post("logout")
  async logout(@Res() res: Response) {
    res.clearCookie("session", this.setCookieOption)
    return res.json({
      code: 200,
      message: "Logout success",
    })
  }

  @Get("verify")
  @Public()
  async verify(@Res() res: Response, @Cookies("session") session: string) {
    try {
      const payload = await this.authService.verify(session)
      return res.json({
        code: 200,
        data: payload,
      })
    } catch (error) {
      return res.json({
        code: 401,
        message: "Unauthorized",
      })
    }
  }
}
