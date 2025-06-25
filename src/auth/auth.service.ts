import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkerService } from '../worker/worker.service';
import { JwtService } from '@nestjs/jwt';
import { CreateWorkerDto } from '../worker/dto/create-worker.dto';
import { SigninWorkerDto } from './dto/worker-signin.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly workerRepo: WorkerService,
    private readonly jwtRepo: JwtService,
  ) {}

  generateToken(payload) {
    const access_token = this.jwtRepo.sign(payload, {
      secret: 'AccessSecretKey',
      expiresIn: '1h',
    });
    const refresh_token = this.jwtRepo.sign(payload, {
      secret: 'RefreshSecretKey',
      expiresIn: '10h',
    });

    return [access_token, refresh_token];
  }

  async signup(res: Response, createWorkerDto: CreateWorkerDto) {
    const newData = await this.workerRepo.create(createWorkerDto);
    const payload = {
      sub: newData.id,
      phone: newData.phone,
    };

    const [access_token, refresh_token] = this.generateToken(payload);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 54000000,
    });

    return {
      message: 'Register successfully!',
      access_token,
    };
  }

  async signin(res: Response, signinWorkerDto: SigninWorkerDto) {
    const data = await this.workerRepo.findOneByPhone(signinWorkerDto.phone);
    const isMatch = await bcrypt.compare(
      signinWorkerDto.password,
      data.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Parol xato!');
    }

    const payload = {
      sub: data.id,
      phone: data.phone,
    };

    const [access_token, refresh_token] = this.generateToken(payload);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 54000000,
    });

    return {
      message: 'Login successfully!',
      access_token,
    };
  }

  logout(res: Response) {
    res.clearCookie('refresh_token');

    return {
      logout: 'success',
    };
  }

  async refresh(req: Request, res: Response) {
    const token = req.cookies['refresh_token'];
    if (!token) {
      throw new UnauthorizedException("Oldin ro'yxatdan o'ting");
    }

    try {
      const payload = await this.jwtRepo.verify(token, {
        secret: 'RefreshSecretKey',
      });
      if (!payload) {
        throw new UnauthorizedException('Token xato 1');
      }
      const [access_token, refresh_token] = this.generateToken({
        sub: payload.sub,
        phone: payload.phone,
      });
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 54000000,
      });

      return {
        message: 'Refresh successfully!',
        access_token,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token xato 2');
    }
  }

  async forgotPassword(phone: string) {
    const worker = await this.workerRepo.findOneByPhone(phone);
    if (!worker) {
      throw new NotFoundException('Bunday worker mavjud emas!');
    }

    const newPassword = '1234abcd';
    const hash = await bcrypt.hash(newPassword, 10);
    worker.password = hash;
    await worker.save();

    return {
      newPassword,
    };
  }
}
