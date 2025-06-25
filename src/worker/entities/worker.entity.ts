import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brange } from '../../brange/entities/brange.entity';

interface IWorker {
  name: string;
  phone: string;
  password: string;
  branch_id: number;
}

@Table({ tableName: 'worker' })
export class Worker extends Model<Worker, IWorker> {
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
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Brange)
  declare branch_id: number;

  @BelongsTo(() => Brange)
  work_place: Brange;
}
