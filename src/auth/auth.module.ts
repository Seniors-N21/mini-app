import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { WorkerModule } from '../worker/worker.module';

@Module({
  imports: [JwtModule.register({}), WorkerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
