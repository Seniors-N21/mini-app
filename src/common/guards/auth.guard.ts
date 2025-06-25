import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException("Oldin ro'yxatdan o'ting");
    }
    const [bearer, token] = authorization?.split(' ');

    try {
      const payload = await this.jwtService.verify(token, {
        secret: 'AccessSecretKey',
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new ForbiddenException('Xato token!');
    }
  }
}
