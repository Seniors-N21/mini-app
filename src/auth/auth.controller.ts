import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateWorkerDto } from '../worker/dto/create-worker.dto';
import { SigninWorkerDto } from './dto/worker-signin.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    return this.authService.signup(res, createWorkerDto);
  }

  @Post('sign-in')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() signinWorkerDto: SigninWorkerDto,
  ) {
    return this.authService.signin(res, signinWorkerDto);
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('refresh')
  refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.refresh(req, res);
  }

  @Post('forgot-password')
  forgotPassword(@Body() data: { phone: string }) {
    return this.authService.forgotPassword(data.phone);
  }
}
