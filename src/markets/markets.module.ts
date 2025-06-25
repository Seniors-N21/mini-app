import { Module } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Market } from './entities/market.entity';
import { Brange } from '../brange/entities/brange.entity';

@Module({
  imports: [SequelizeModule.forFeature([Market, Brange])],
  controllers: [MarketsController],
  providers: [MarketsService],
})
export class MarketsModule {}
