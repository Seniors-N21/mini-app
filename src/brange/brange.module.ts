import { Module } from '@nestjs/common';
import { BrangeController } from './brange.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brange } from './entities/brange.entity';
import { Market } from '../markets/entities/market.entity';
import { BrangeService } from './brange.service';
import { Worker } from '../worker/entities/worker.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brange, Market, Worker])],
  controllers: [BrangeController],
  providers: [BrangeService],
})
export class BrangeModule {}
