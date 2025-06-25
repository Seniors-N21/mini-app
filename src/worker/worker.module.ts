import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import { Brange } from '../brange/entities/brange.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker, Brange]),
    JwtModule.register({}),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
