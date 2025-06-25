import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Brange } from '../../brange/entities/brange.entity';

interface IMarketAttr {
  name: string;
}

@Table
export class Market extends Model<Market, IMarketAttr> {
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

  @HasMany(() => Brange)
  branges: Brange[];
}
