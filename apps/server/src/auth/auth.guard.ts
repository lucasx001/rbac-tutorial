import { IS_PUBLIC_KEY } from "@/decorators/is_public"
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "@repo/shared"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      // 💡 See this condition
      return true
    }
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromCookies(request)

    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request["session"] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const token = request.cookies["session"]
    return token
  }
}
