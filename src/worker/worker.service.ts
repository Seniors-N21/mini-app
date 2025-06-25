import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private readonly workerRepo: typeof Worker,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const hash = await bcrypt.hash(createWorkerDto.password, 10);
    return this.workerRepo.create({
      ...createWorkerDto,
      password: hash,
    });
  }

  async findAll() {
    const allData = await this.workerRepo.findAll({
      include: { all: true },
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.workerRepo.findByPk(id, {
      include: { all: true },
    });
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return oneData;
  }

  async findOneByPhone(phone: string) {
    const oneData = await this.workerRepo.findOne({
      where: { phone },
    });
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return oneData;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    const oneData = await this.workerRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.workerRepo.update(updateWorkerDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const oneData = await this.workerRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.workerRepo.destroy({ where: { id } });
  }
}
