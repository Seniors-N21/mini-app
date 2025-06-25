import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Market } from '../../markets/entities/market.entity';
import { Worker } from '../../worker/entities/worker.entity';

interface IBrangeAttr {
  name: string;
  address: string;
  market_id: number;
}

@Table({ tableName: 'brange' })
export class Brange extends Model<Brange, IBrangeAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Market)
  declare market_id: number;

  @BelongsTo(() => Market)
  market: Market;

  @HasMany(() => Worker)
  workers: Worker[];
}
