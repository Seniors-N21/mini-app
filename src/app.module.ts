import { Module } from '@nestjs/common';
import { MarketsModule } from './markets/markets.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Market } from './markets/entities/market.entity';
import { BrangeModule } from './brange/brange.module';
import { Brange } from './brange/entities/brange.entity';
import { WorkerModule } from './worker/worker.module';
import { AuthModule } from './auth/auth.module';
import { Worker } from './worker/entities/worker.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Uzb$0706',
      database: 'mini-app',
      autoLoadModels: true,
      logging: false,
      models: [Market, Brange, Worker],
    }),
    MarketsModule,
    BrangeModule,
    WorkerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
