import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    if (payload.sub === request.params.id) {
      return true;
    } else {
      throw new ForbiddenException("Ruxsat yo'q");
    }
  }
}
